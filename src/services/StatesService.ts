import axios from 'axios'
import { getRepository, getConnection } from 'typeorm'
import { States } from '../entity/States'

export function load() {
    return new Promise((resolve) => {
        axios
            .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(res => {
                res.data.map(item => {
                    const state = getRepository(States).create({
                        id: item.id,
                        sigla: item.sigla,
                        name: item.nome
                    })
                    getRepository(States).save(state)
                })
                return resolve(res.data)
            })
    }).catch(erro => { console.log(erro) })
}