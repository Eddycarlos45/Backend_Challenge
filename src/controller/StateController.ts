import { getRepository, getConnection } from 'typeorm'
import { Response, Request } from 'express'
import { States } from '../entity/States';
import { load } from '../services/StatesService'


export const getStates = async (request: Request, response: Response) => {

    try {
        await getRepository(States).find()
            .then(states => {
                return response.status(200).json(states)
            })
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}

export const loadStates = async (request: Request, response: Response) => {
    try {
        await load()
            .then(states => {
                return response.status(200).json(states)
            })
    } catch (err) {
        return response.status(400).json({ error: err })
    }
}
