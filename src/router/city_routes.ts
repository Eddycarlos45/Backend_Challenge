import { Router } from 'express'

import { addCity, getCity, getCitiesByState, removeCity } from '../controller/CityController'

const cityRouter = Router()

cityRouter.post('/', addCity)
cityRouter.get('/:nome', getCity)
cityRouter.get('/estado/:estado', getCitiesByState)
cityRouter.delete('/:id', removeCity)

export default cityRouter