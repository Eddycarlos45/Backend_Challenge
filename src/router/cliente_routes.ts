import { Router } from 'express'

import { addCliente, getCliente, getClientes, updateCliente, removeCliente } from '../controller/ClienteController'

const clienteRouter = Router()

clienteRouter.get('/', getClientes)
clienteRouter.post('/', addCliente)
clienteRouter.get('/:index', getCliente)
clienteRouter.put('/:id', updateCliente)
clienteRouter.delete('/:id', removeCliente)

export default clienteRouter