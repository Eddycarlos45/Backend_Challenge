import { Router } from 'express'

import { addCity, getCity, getCitiesByState, removeCity, updateCity } from '../controller/CityController'

const cityRouter = Router()

cityRouter.post('/', addCity)
cityRouter.get('/:nome', getCity)
cityRouter.get('/estado/:nome', getCitiesByState)
cityRouter.delete('/:id', removeCity)
cityRouter.put('/:id', updateCity)

export default cityRouter