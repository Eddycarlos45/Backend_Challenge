import { getRepository, getConnection } from 'typeorm'
import { Response, Request } from 'express'
import { Cities } from "../entity/Cities";
import { validate } from "class-validator"
import { States } from '../entity/States';
import { searchCity } from '../services/CitiesService'

export const addCity = async (request: Request, response: Response) => {
    const { name, state } = request.body

    const city = getRepository(Cities).create({
        name,
        state
    })

    validate(city)
        .then(errors => {
            if (errors.length > 0)
                return response.status(400).json(errors)
        })

    await searchCity(name)
        .then(isValid => {
            if (isValid == false)
                return response.status(400).json({ message: 'Digite uma cidade válida, por favor!' })
            try {
                getRepository(Cities).save(city)
                return response.status(201).json(city)
            } catch (err) {
                return response.status(500).json({ error: err })
            }
        })
}

export const getCity = async (request: Request, response: Response) => {
    const { nome } = request.params

    try {
        await getRepository(Cities).findOne({ where: { name: nome } })
            .then(city => {
                if (typeof (city) === "undefined") {
                    return response.status(404).json({ message: "Cidade não encontrada" })
                }
                return response.status(200).json(city)
            })
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

export const getCitiesByState = async (request: Request, response: Response) => {
    const { estado } = request.params

    try {
        await getRepository(States).find({
            relations: ["cities"],
            where: { name: estado },
            cache: {
                id: 'cities',
                milliseconds: 60000
            }
        })
            .then(cities => {
                if (cities.length === 0) {
                    return response.status(404).json({ message: "Estado não encontrado" })
                }
                return response.status(200).json(cities)
            })
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

export const removeCity = async (request: Request, response: Response) => {
    const { id } = request.params
    const connection = getConnection();
    try {
        const city = await getRepository(Cities).delete(id)

        if (city.affected === 1) {
            const cityDeleted = await getRepository(Cities).findOne(id)

            await connection.queryResultCache.remove(["cities"]);

            return response.status(200).json({ message: 'Cidade com id:' + id + ' deletada com sucesso' })
        }
        return response.status(404).json({ message: "Cidade não encontrada" })

    } catch (err) {
        return response.status(400).json({ error: err })
    }
}