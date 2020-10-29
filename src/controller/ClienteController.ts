import { getRepository } from 'typeorm'
import { Clientes } from '../entity/Clientes'
import { Request, Response } from 'express'

export const getClientes = async (request: Request, response: Response) => {

    const clientes = await getRepository(Clientes).find()

    return response.json(clientes)
}

export const addCliente = async (request: Request, response: Response) => {

    const cliente = await getRepository(Clientes).save(request.body)

    return response.json(cliente)
}


export const getCliente = async (request: Request, response: Response) => {
    const { index } = request.params

    const cliente = await getRepository(Clientes).findOne(index)

    return response.json(cliente)

}


export const updateCliente = async (request: Request, response: Response) => {
    const { id } = request.params

    const cliente = await getRepository(Clientes).update(id, request.body)

    if (cliente.affected === 1) {
        const clienteUpdated = await getRepository(Clientes).findOne(id)
        return response.json(clienteUpdated)
    }

    return response.status(404).json({ message: "Cliente não encontrado" })
}
