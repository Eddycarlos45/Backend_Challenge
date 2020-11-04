import { Router } from 'express'

import { addCity, getCity, getCitiesByState, removeCity, updateCity, getCities } from '../controller/CityController'

const cityRouter = Router()

cityRouter.post('/', addCity)
cityRouter.get('/:nome', getCity)
cityRouter.get('/', getCities)
cityRouter.get('/estado/:nome', getCitiesByState)
cityRouter.delete('/:id', removeCity)
cityRouter.put('/:id', updateCity)

export default cityRouter