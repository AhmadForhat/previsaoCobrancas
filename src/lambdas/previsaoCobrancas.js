const axios = require('axios')
const moment = require('moment')
const arrayToObject = require('@ziro/array-object')
const objectToArray = require('@ziro/object-array')
const main = require('../templates/main')
const optionsGet = require('../utils/optionsSheetBatch')
const calcPrevisoes = require('../utils/calcPrevisoes')
// const sendSheetOptions = require('../utils/optionsSheetPost') // Requisição para POST googleSheets
require('dotenv').config()

const sendEmail = async () => {
    try {
        // Requisição
        const dataSheet = await axios(optionsGet(['sendJavaScript!A:D']))
        const baseSheet = await arrayToObject(dataSheet.data.valueRanges[0])
        const resultsPrevisoes = calcPrevisoes(baseSheet)
        // Resultado em Objeto
        const resultPrevisoesData = resultsPrevisoes.map(item => {
            return {
                proximaCobranca: moment.utc(item.proximaCobranca).local().format('DD/MM/YYYY'),
                cobrancasAtrasadas: moment.utc(item.cobrancasAtrasadas).local().format('DD/MM/YYYY')
            }})
        // Resultado em Array
        const resultSheet = objectToArray([resultPrevisoesData])
        // Função POST Sheets
        // const sendSheet = await axios(sendSheetOptions(resultSheet,'Boletos!AA1'))
        return {
            statusCode: 200,
            body: JSON.stringify(resultSheet)
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify('Erro ao tentar fazer suas previsões!')
        }
    }
}

module.exports = { handler: main(sendEmail) }