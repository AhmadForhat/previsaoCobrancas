const testCalcPrevisoes = require('./src/utils/calcPrevisoes')
const moment = require('moment')

const data = [
    {
        'vencimento': '08/05/2020',
        'status': 'Baixado',
        'baixa': '10/05/2020',
        'condPagamento': 'SemanalSexta'
    },
    {
        'vencimento': '08/05/2020',
        'status': 'Baixado',
        'baixa': '26/05/2020',
        'condPagamento': 'MensalÚltima Sexta'
    }
]

const resultsPrevisoes = testCalcPrevisoes(data)

const resultPrevisoesData = resultsPrevisoes.map(item => {
    return {
        proximaCobranca: moment.utc(item.proximaCobranca).local().format('DD/MM/YYYY'),
        cobrancasAtrasadas: moment.utc(item.cobrancasAtrasadas).local().format('DD/MM/YYYY')
    }})

console.log(resultPrevisoesData)