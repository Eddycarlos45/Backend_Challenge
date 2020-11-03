import { Router } from 'express'

import { addCostumer, getCostumer, getCostumers, updateCostumer, removeCostumer, getCostumersByCities } from '../controller/CustomerController'

const costumerRouter = Router()

costumerRouter.get('/', getCostumers)
costumerRouter.post('/', addCostumer)
costumerRouter.get('/search/:index', getCostumer)
costumerRouter.put('/:id', updateCostumer)
costumerRouter.delete('/:id', removeCostumer)
costumerRouter.get('/relation', getCostumersByCities)

export default costumerRouter