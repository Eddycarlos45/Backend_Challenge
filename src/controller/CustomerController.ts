import { getRepository, getConnection } from 'typeorm'
import { Costumers } from '../entity/Costumers'
import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { calculateAge, validateName } from '../utils/validators'

export const getCostumers = async (request: Request, response: Response) => {
    try {
        const costumers = await getRepository(Costumers).find({
            cache: {
                id: 'costumers',
                milliseconds: 60000
            }
        })
        return response.status(200).json(costumers)
    } catch (err) {
        console.log("erro: ", err.message)
        return response.status(400).json({ error: err })
    }
}

export const addCostumer = async (request: Request, response: Response) => {
    const { fullname, gender, birthday, age, city } = request.body

    const costumer = getRepository(Costumers).create({
        fullname,
        gender,
        birthday,
        age,
        city
    })
    const isValid = validateName(fullname)
    if (isValid === false) {
        return response.status(400).json({ message: 'Digite seu nome completo' })
    }

    const ageIsTrue = calculateAge(costumer.birthday)
    if (ageIsTrue === parseInt(age)) {

        await validate(costumer).then(errors => {
            if (errors.length > 0) return response.status(400).json(errors)
            console.log('validation succeed');

            try {
                getRepository(Costumers).save(costumer)
                    .then(() => {
                        return response.status(201).json(costumer)
                    })
                    .catch(err => {
                        if (err.sqlState === '23000') return response.status(400).json({ message: 'Id da cidade não existe', error: err })
                        return response.status(400).json({ error: err })
                    })
            } catch (err) {
                return response.status(500).json({ error: err })
            }
        });
    } else {
        return response.status(400).json({ message: 'Data de nascimento ou idade inválidos' })
    }
}

export const getCostumer = async (request: Request, response: Response) => {
    const { index } = request.params
    try {
        const costumer = await getRepository(Costumers).createQueryBuilder("costumers")
            .where("costumers.id = :index OR costumers.fullname = :index", { index: index })
            .getMany()
            .then(costumer => {
                if (costumer.length === 0) {
                    return response.status(404).json({ message: "Cliente não encontrado(a)" })
                }
                return response.status(200).json(costumer)
            })
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

export const updateCostumer = async (request: Request, response: Response) => {
    const { id } = request.params
    const { birthday, age, fullname } = request.body

    const isValid = validateName(fullname)
    if (isValid === false) {
        return response.status(400).json({ message: 'Digite seu nome completo' })
    }

    const ageIsTrue = calculateAge(birthday)
    if (ageIsTrue === parseInt(age)) {
        try {
            const costumer = await getRepository(Costumers).update(id, request.body)

            if (costumer.affected === 1) {
                const costumerUpdated = await getRepository(Costumers).findOne(id)
                return response.status(200).json({ message: 'Cliente com id:' + id + ' atualizado com sucesso' })
            }
            return response.status(404).json({ message: "Cliente não encontrado(a)" })
        } catch (err) {
            return response.status(400).json(err)
        }
    } else {
        return response.status(400).json({ message: 'Data de nascimento ou idade inválidos' })
    }
}

export const removeCostumer = async (request: Request, response: Response) => {
    const { id } = request.params
    const connection = getConnection();
    try {
        const costumer = await getRepository(Costumers).delete(id)

        if (costumer.affected === 1) {
            
            await connection.queryResultCache.remove(["costumers"]);

            return response.status(200).json({ message: 'Cliente com id:' + id + ' deletado com sucesso' })
        }
        return response.status(404).json({ message: "Cliente não encontrado(a)" })

    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

export const getCostumersByCities = async (request: Request, response: Response) => {

    try {
        const costumer = await getRepository(Costumers).query(`
        SELECT c.fullname AS cliente, d.name AS cidade
        FROM costumers c
        INNER JOIN cities d
        ON c.cityId = d.id;`)
            .then(costumer => {
                return response.status(200).json(costumer)
            })
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}
