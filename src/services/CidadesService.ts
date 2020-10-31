import axios from 'axios'

export function buscaCidade(cidade: string) {
    return new Promise((resolve) => {
        axios
            .get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios/' + cidade)
            .then(res => {
                if (isEmpty(res.data)) {
                    return resolve(false)
                }
                return resolve(true)
            })
    }).catch(erro => console.log(erro))
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
