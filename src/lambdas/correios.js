const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios');
const bodyCorreios = require('../utils/bodyCorreios');
const axiosConfigCorreios = require('../utils/axiosConfigCorreios')
const AxiosPlugin = require('vue-axios-cors')
const convert = require('xml-js')
require('dotenv').config()



const correios = async event => {
	try {
		const frete = await axios.post(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo`, 
		bodyCorreios, axiosConfigCorreios)
		const formatado = await convert.xml2js(frete.data, {compact: true, spaces: 4})
		return {
			statusCode: 200,
			body: JSON.stringify(formatado),

		}
	} catch (error) {
		console.log(error)
		throw createError(500, error)
	}
}

const handler = middy(correios)
	.use(httpJsonBodyParser())
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }