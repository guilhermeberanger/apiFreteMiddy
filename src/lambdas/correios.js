const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');
const createError = require('http-errors');
const axios = require('axios');
//const bodyCorreios = require('../utils/bodyCorreios');
const axiosConfigCorreios = require('../utils/axiosConfigCorreios');
const AxiosPlugin = require('vue-axios-cors');
require('dotenv').config()




const correios = async event => {

	try {
		if (
			event.httpMethod === 'OPTIONS'
		) {
			return {
				statusCode: 200,
				headers: {
					'access-control-allow-origin': '*',
					'Access-Control-Allow-Headers': '*'
				},
				body: 'ok'
			}
		}
		const { recebe } = event.body;
		const cep1 = event.body.cepOrigem;
		const cep2 = event.body.cepDestino;
		const peso = event.body.peso;
		const valorNF = event.body.valorDeclarado;
		const newBodyCorreios = {

			nCdEmpresa: " ",
			sDsSenha: " ",
			nCdServico: "04014",
			sCepOrigem: cep1,
			sCepDestino: cep2,
			nVlPeso: peso,
			nCdFormato: "3",
			nVlComprimento: "1.1",
			nVlAltura: "2",
			nVlLargura: "2",
			nVlDiametro: "2",
			sCdMaoPropria: "S",
			nVlValorDeclarado: "90.0",
			sCdAvisoRecebimento: "S"

		}
		console.log(newBodyCorreios)

		const frete = await axios.post(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo`,
			newBodyCorreios, axiosConfigCorreios)

		return {
			statusCode: 200,
			headers: {
				'access-control-allow-origin': '*',
				'Access-Control-Allow-Headers' : '*'
			  },
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
//.use(cors({ headers: 'origins, x-requested-with, content-type'}))

module.exports = { handler }