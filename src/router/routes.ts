import { Router } from 'express';
import cidadeRouter from './cidade_routes';
import clienteRouter from './cliente_routes';

const routes = Router();

routes.use('/clientes', clienteRouter)
routes.use('/cidades', cidadeRouter)

export default routes
