const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios');
const bodyBrasPres = require('../utils/bodyBrasPres');
const axiosConfigBrasPres = require('../utils/axiosConfigBrasPres')
const convert = require('xml-js')
require('dotenv').config()


const braspres = async event => {

    try {

        const paramns = bodyBrasPres
        const url = Object.values(paramns)
        console.log(url)
        const frete = await axios.post(`http://www.braspress.com.br/cotacaoXml?param=${url}`)
        const formatado = await convert.xml2js(frete.data, {compact: true, spaces: 4})
         
         return {
			statusCode: 200,
			body: JSON.stringify(formatado)

		}

    } catch (error) {
		console.log(error)
		throw createError(500, error)
    }
}

const handler = middy(braspres)
    .use(httpJsonBodyParser())
    .use(httpUrlencodeBodyParser())
    .use(httpErrorHandler())

module.exports = { handler }