import { getRepository } from 'typeorm'
import { Clientes } from '../entity/Clientes'
import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { calculateAge, validateName } from '../utils/validators'

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
    const name = validateName(nome_completo)
    if (name === false) {
        return response.status(400).json({ message: 'Digite seu nome completo' })
    }

    const age = calculateAge(cliente.data_de_nascimento)
    if (age === parseInt(idade)) {

        await validate(cliente).then(errors => {
            if (errors.length > 0) return response.status(400).json(errors)
            console.log('validation succeed');

            try {
                getRepository(Clientes).save(cliente)
                return response.status(201).json(cliente)
            } catch (err) {
                return response.status(500).json({ error: err })
            }
        });
    } else {
        return response.status(400).json({ message: 'Data de nascimento ou idade inválidos' })
    }
}

export const getCliente = async (request: Request, response: Response) => {
    const { index } = request.params
    try {
        const cliente = await getRepository(Clientes).query(`SELECT * FROM CLIENTES WHERE id='${index}' OR nome_completo='${index}'`)
            .then(cliente => {
                if (cliente.length === 0) {
                    return response.status(404).json({ message: "Cliente não encontrada" })
                }
                return response.status(200).json(cliente)
            })
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
            return response.status(200).json({ message: 'Cliente com id:' + id + ' atualizado com sucesso' })
        }
        return response.status(404).json({ message: "Cliente não encontrado" })
    } catch (err) {
        return response.status(400).json(err)
    }
}

export const removeCliente = async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const cliente = await getRepository(Clientes).delete(id)

        if (cliente.affected === 1) {
            const clienteDeleted = await getRepository(Clientes).findOne(id)
            return response.status(200).json({ message: 'Cliente com id:' + id + ' deletado com sucesso' })
        }
        return response.status(404).json({ message: "Cliente não encontrado" })

    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

