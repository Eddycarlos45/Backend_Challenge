import axios from 'axios'

export function searchCity(city: string) {
    return new Promise((resolve) => {
        axios
            .get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios/')
            .then(res => {
                res.data.map(item => {
                    if (item.nome === city)
                        return resolve(true)
                })
                return resolve(false)
            })
    }).catch(erro => console.log(erro))
}

