/* 
Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida
 */

const {CONFIG} = require('./configuration')
const axios = require('axios')
const API_KEY = '146e850c-31e1-4a41-9f72-38fd5433bc57'

exports.getDogById = async (id) => {
    try {
    const fullUrl = CONFIG.URL + '?' +
    `api_key=${API_KEY}`
    console.log(fullUrl)
    const {data} = await axios.get(fullUrl)
    id = Number(id)
    const filtrado = data.filter(elemento => elemento.id === id)
    return filtrado
    } catch(error) {
        return console.log('algo salio mal EN GETDOGBYID', error)
    }
}