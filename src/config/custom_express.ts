import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "../router/routes";

const app = express()

app.use(bodyParser.json())
app.use(routes)

app.use(function (req, resp, next) {
    return resp.status(404).json({ message: 'Url not found' })
})

app.use(function (erro, req, resp, next) {
    return resp.status(505).json({ message: 'An error occurred, try later' })
})

export default app