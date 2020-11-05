import axios from 'axios'

export function searchCity(city: string) {
    return new Promise((resolve) => {
        axios
            .get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios/')
            .then(res => {
                console.log(res.data.microrregiao)
                res.data.map(item => {
                    if (item.nome === city)
                        return resolve(true)
                })
                return resolve(false)
            })
    }).catch(erro => console.log(erro))
}

