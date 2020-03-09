const goFrete = require('../utils/axiosConfigGoFrete')

module.exports = ({
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
      cep: "30320900"
    },
    Token: goFrete
  })