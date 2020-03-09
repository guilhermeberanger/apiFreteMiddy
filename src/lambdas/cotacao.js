const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios');
const body = require('../utils/bodyConfig');
const axiosConfig = require('../utils/axiosConfig');
require('dotenv').config()

const api = async event => {
	try {
		//const endPoint = `v1/quotation`
		const data = await axios.post(`https://sandbox.centraldofrete.com/v1/quotation`, body, axiosConfig)
		const resultado = await axios.get(`https://sandbox.centraldofrete.com/v1/quotation/${data.data.code}`, axiosConfig)

		return {
			statusCode: 200,
			body: JSON.stringify(resultado.data),

		}
	} catch (error) {
		console.log(error.response.data)
		createError(500, error)
		}
}

const handler = middy(api)
	.use(httpJsonBodyParser())
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }