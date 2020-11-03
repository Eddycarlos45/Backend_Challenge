import { Router } from 'express'

import { addCostumer, getCostumer, getCostumers, updateCostumer, removeCostumer } from '../controller/CustomerController'

const costumerRouter = Router()

costumerRouter.get('/', getCostumers)
costumerRouter.post('/', addCostumer)
costumerRouter.get('/:index', getCostumer)
costumerRouter.put('/:id', updateCostumer)
costumerRouter.delete('/:id', removeCostumer)

export default costumerRouter