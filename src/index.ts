import { createConnection } from 'typeorm'
import  app from '../src/config/custom_express'

createConnection()
    .then(() => {

        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000")
        })

    })
    .catch(error => console.log(error))
