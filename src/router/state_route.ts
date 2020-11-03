import { Router } from 'express'

import { getStates, loadStates } from '../controller/StateController'

const stateRouter = Router()

stateRouter.get('/', getStates)
stateRouter.get('/load', loadStates)

export default stateRouter