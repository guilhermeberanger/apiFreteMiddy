const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios');
const bodyCorreios = require('../utils/bodyCorreios');
const axiosConfigCorreios = require('../utils/axiosConfigCorreios')
const AxiosPlugin = require('vue-axios-cors')
require('dotenv').config()



const correios = async event => {
	try {
		const frete = await axios.post(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo`, bodyCorreios, axiosConfigCorreios)
		
		return {
			statusCode: 200,
			body: JSON.stringify(frete.data),

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