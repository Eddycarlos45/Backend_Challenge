import { getRepository } from 'typeorm'
import { Response, Request } from 'express'
import { Cidades } from "../entity/Cidades";
import { validate } from "class-validator"
import { Estados } from '../entity/Estados';

export const addCidade = async (request: Request, response: Response) => {
    const { nome, estado } = request.body

    const cidade = getRepository(Cidades).create({
        nome,
        estado
    })

    validate(cidade)
        .then(errors => {
            if (errors.length > 0)
                return response.status(400).json(errors)
        })

    try {
        await getRepository(Cidades).save(cidade)
        return response.status(201).json(cidade)
    } catch (err) {
        return response.status(500).json({ error: err })
    }
}

export const getCidade = async (request: Request, response: Response) => {
    const { nome } = request.params

    try {
        await getRepository(Cidades).findOne({ where: { nome: nome } })
            .then(cidade => {
                if (typeof (cidade) === "undefined") {
                    return response.status(404).json({ message: "Cidade não encontrada" })
                }
                return response.status(200).json(cidade)
            })
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

export const getCidadesPorEstado = async (request: Request, response: Response) => {
    const { estado } = request.params

    try {
        await getRepository(Estados).find({ relations: ["cidades"] })
            .then(cidades => {
                if (cidades.length === 0) {
                    return response.status(404).json({ message: "Estado não encontrado" })
                }
                return response.status(200).json(cidades)
            })
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}