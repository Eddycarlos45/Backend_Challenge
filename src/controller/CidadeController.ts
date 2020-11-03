import { getRepository, getConnection } from 'typeorm'
import { Response, Request } from 'express'
import { Cidades } from "../entity/Cidades";
import { validate } from "class-validator"
import { Estados } from '../entity/Estados';
import { buscaCidade } from '../services/CidadesService'

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

    await buscaCidade(nome)
        .then(isValid => {
            if (isValid == false)
                return response.status(400).json({ message: 'Digite uma cidade válida, por favor!' })
            try {
                getRepository(Cidades).save(cidade)
                return response.status(201).json(cidade)
            } catch (err) {
                return response.status(500).json({ error: err })
            }
        })
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
        await getRepository(Estados).find({
            relations: ["cidades"],
            where: { nome: estado },
            cache: {
                id: 'cidades',
                milliseconds: 60000
            }
        })
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

export const removeCidade = async (request: Request, response: Response) => {
    const { id } = request.params
    const connection = getConnection();
    try {
        const cidade = await getRepository(Cidades).delete(id)

        if (cidade.affected === 1) {
            const cidadeDeleted = await getRepository(Cidades).findOne(id)

            await connection.queryResultCache.remove(["cidades"]);

            return response.status(200).json({ message: 'Cidade com id:' + id + ' deletada com sucesso' })
        }
        return response.status(404).json({ message: "Cidade não encontrada" })

    } catch (err) {
        return response.status(400).json({ error: err })
    }
}