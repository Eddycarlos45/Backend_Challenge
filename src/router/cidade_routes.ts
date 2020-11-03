import { Router } from 'express'

import { addCidade, getCidade, getCidadesPorEstado, removeCidade } from '../controller/CidadeController'

const cidadeRouter = Router()

cidadeRouter.post('/', addCidade)
cidadeRouter.get('/:nome', getCidade)
cidadeRouter.get('/estado/:estado', getCidadesPorEstado)
cidadeRouter.delete('/:id', removeCidade)

export default cidadeRouter