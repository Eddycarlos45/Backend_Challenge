import { getRepository } from 'typeorm'
import { Clientes } from '../entity/Clientes'
import { Request, Response } from 'express'
import { validate } from 'class-validator'

export const getClientes = async (request: Request, response: Response) => {
    try {
        const clientes = await getRepository(Clientes).find()
        return response.status(200).json(clientes)
    } catch (err) {
        console.log("erro: ", err.message)
        return response.status(400).json({ error: err })
    }
}

export const addCliente = async (request: Request, response: Response) => {
    const { nome_completo, sexo, data_de_nascimento, idade, cidade } = request.body
    const cliente = getRepository(Clientes).create({
        nome_completo,
        sexo,
        data_de_nascimento,
        idade,
        cidade
    })
    validate(cliente).then(errors => {
        if (errors.length > 0) {
            return response.status(400).json(errors)
        } else {
            console.log('validation succeed');
        }
    });
    try {
        const cliente = await getRepository(Clientes).save(request.body)
        return response.status(201).json(cliente)
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

export const getCliente = async (request: Request, response: Response) => {
    const { index } = request.params
    try {
        const cliente = await getRepository(Clientes).findOne(index)
        return response.status(200).json(cliente)
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

export const updateCliente = async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const cliente = await getRepository(Clientes).update(id, request.body)

        if (cliente.affected === 1) {
            const clienteUpdated = await getRepository(Clientes).findOne(id)
            return response.json(clienteUpdated)
        }
        return response.status(404).json({ message: "Cliente não encontrado" })
    } catch (err) {
        return response.status(400).json(err)
    }
}
