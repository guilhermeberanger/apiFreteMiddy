const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios');
const bodyGoFrete = require('../utils/bodyGoFrete');
const goFrete = require('../utils/axiosConfigGoFrete')
require('dotenv').config()

const gofrete = async event => {
	try {
		if (
			event.httpMethod === 'OPTIONS'
		  ){
			return {
			  statusCode: 200,
			  headers: {
				'access-control-allow-origin': '*',
				'Access-Control-Allow-Headers' : '*',
				'Content-Type': 'application/json'
			  },
			  body: 'ok'
			}
		  }

		 const dadosHtml = JSON.parse(event.body)
		 const newBodyGoFrete = {
			Produtos:[{
			  peso: 10,
			  altura: 400,
			  largura: 340,
			  comprimento: 600,
			  valor: 10
			}],
			Origem: {
			  logradouro: "R. Lubavitch",
			  numero: "71",
			  complemento: "",
			  bairro: "bom retiro",
			  referencia: "",
			  cep: "01123010"
			},
			Destino: {
			  logradouro: "BR-356",
			  numero: "3049",
			  complemento: "",
			  bairro: "Belvedere",
			  referencia: "",
			  cep: dadosHtml.cepDestino
			},
			Token: goFrete
		  }

		const data = await axios.post(`api.gofretes.com.br/cotacao`, bodyGoFrete)
		console.log(data.data)
		return {
			statusCode: 200,
			headers: {
				'access-control-allow-origin': '*',
				'Access-Control-Allow-Headers' : '*',
				'Content-Type': 'application/json'
			  },
			body: JSON.stringify(data.data),

		}
	} catch (error) {
				throw (error)
		}
}

const handler = middy(gofrete)
	.use(httpJsonBodyParser())
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }