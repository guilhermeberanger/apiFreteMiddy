const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios');
const bodyBrasPres = require('../utils/bodyBrasPres');
const axiosConfigBrasPres = require('../utils/axiosConfigBrasPres')
require('dotenv').config()

const braspres = async event => {

    try {

        const returnType = 'json'
        const frete = await axios.post(`https://hml-api.braspress.com/v1/cotacao/calcular/${returnType}`,
        bodyBrasPres, axiosConfigBrasPres)
         
         console.log('keys', frete.data)
         
         return {
			statusCode: 200,
			body: JSON.stringify(frete.data)

		}

    } catch (error) {

        console.log(error)
    }
}

const handler = middy(braspres)
    .use(httpJsonBodyParser())
    .use(httpUrlencodeBodyParser())
    .use(httpErrorHandler())

module.exports = { handler }