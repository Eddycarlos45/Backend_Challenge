import "reflect-metadata";
import { createConnection } from 'typeorm'
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./router/cliente_routes";

const app = express()

app.use(bodyParser.json())
app.use(routes)

createConnection()
    .then(() => {

        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000")
        })

    })
    .catch(error => console.log(error))
