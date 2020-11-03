import { Router } from 'express';
import cityRouter from './city_routes';
import costumerRouter from './costumer_routes';

const routes = Router();

routes.use('/clientes', costumerRouter)
routes.use('/cidades', cityRouter)

export default routes
