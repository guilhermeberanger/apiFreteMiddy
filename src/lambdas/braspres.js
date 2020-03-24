const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')//midd
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')//midd
const httpErrorHandler = require('@middy/http-error-handler')//midd
const createError = require('http-errors')//midd
const axios = require('axios');
//const bodyBrasPres = require('../utils/bodyBrasPres');
//const convert = require('xml-js')
const cors = require('@middy/http-cors')
require('dotenv').config()


const braspres = async event => {
  try {

    const cep1 = event.body.cepOrigem;
    const cep2 = event.body.cepDestino;
    const peso = event.body.peso;
    const valorNF = event.body.valorDeclarado;

    const bodyBras = {
      CNPJ: "28026371000161",
      EMPORIGEM: "2",
      CEPORIGEM: cep1,
      CEPDESTINO: cep2,
      CNPJREM: "28026371000161",
      CNPJDES: "28026371000161",
      TIPOFRETE: "2",
      PESO: peso,
      VALORNF: valorNF,
      VOLUME: "1",
      MODAL: "R"
    }


    const paramns = bodyBras
    const url = Object.values(paramns)
    console.log(url)
    //const frete = await axios.post(`http://www.braspress.com.br/cotacaoXml?param=${url}`)
    //console.log(frete)
    //const formatado = await convert.xml2js(frete.data, { compact: true, spaces: 4 })

    return {
      statusCode: 200,

     // body: JSON.stringify(frete.data)

    }

  } catch (error) {
    console.log(error.response.data)
    throw createError(500, error.response.data)
  }
}

const handler = middy(braspres)
  .use(httpJsonBodyParser())
  .use(httpUrlencodeBodyParser())
  .use(httpErrorHandler())
  .use(cors({ headers: 'origins, x-requested-with, content-type, accept, application/json, *' }))



module.exports = { handler }