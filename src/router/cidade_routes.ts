import { Router } from 'express'

import { addCidade, getCidade, getCidadesPorEstado } from '../controller/CidadeController'

const cidadeRouter = Router()

cidadeRouter.post('/', addCidade)
cidadeRouter.get('/:nome', getCidade)
cidadeRouter.get('/estado/:estado', getCidadesPorEstado)

export default cidadeRouter