import { Router, Request, Response } from 'express'

import { addCliente, getCliente, getClientes, updateCliente } from './controller/ClienteController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'hello world' })
})

routes.get('/clientes', getClientes)
routes.post('/clientes', addCliente)
routes.get('/clientes/:index', getCliente)
routes.get('/clientes/:nome', getCliente)
routes.put('/clientes/:id', updateCliente)

export default routes