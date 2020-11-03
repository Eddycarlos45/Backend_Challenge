import { Router } from 'express';
import cityRouter from './city_routes';
import costumerRouter from './costumer_routes';
import stateRoute from './state_route'

const routes = Router();

routes.use('/clientes', costumerRouter)
routes.use('/cidades', cityRouter)
routes.use('/estados', stateRoute)

export default routes
