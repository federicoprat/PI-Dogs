require('dotenv').config();

const {CONFIG} = require('./configuration')
const axios = require('axios')
const {API_KEY} = process.env

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