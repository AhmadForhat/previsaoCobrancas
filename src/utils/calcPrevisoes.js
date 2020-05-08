const stringToData = (stringData) => {
    const arrayData = stringData.split('/')
    const [ dia, mes, ano ] = arrayData
    return new Date(ano, mes-1, dia)
}

const operacaoDias = (inicio, operador) => {
    return new Date(inicio.setDate(inicio.getDate() + operador))
}
  
const proximoDiaDaSemana = (data, dia) => {
    if (data.getDay() <= dia) return operacaoDias(data, dia - data.getDay())
    return operacaoDias(data, dia - data.getDay() + 7)
}
  
const getDayThisMonth = (data, dia, operadorMes) => {
    var mes = data.getMonth() + operadorMes
    var ano = data.getFullYear()
    var d = new Date(ano, mes),
        month = d.getMonth(),
        fridays = []
    d.setDate(1)
    while (d.getDay() !== dia) {
        d.setDate(d.getDate() + 1)
    }
    while (d.getMonth() === month) {
        fridays.push(new Date(d.getTime()))
        d.setDate(d.getDate() + 7)
    }
    return fridays
}
  
const proximaDataCobranca = (stringData, condicao) => {
    const dia = stringData
    if (condicao === 'QuinzenalSexta') {
        const proximaSexta = proximoDiaDaSemana(dia, 5)
        return operacaoDias(proximaSexta,7)
    }
    if (condicao === 'SemanalSegunda' || condicao === 'SemanalSegunda a Quinta') {
        const proximaSegunda = proximoDiaDaSemana(dia, 1)
        return proximaSegunda
    }
    if (condicao === 'SemanalTerça' || condicao === 'SemanalTerça a Quinta') {
        const proximaTerca = proximoDiaDaSemana(dia, 2)
        return proximaTerca
    }
    if (condicao === 'SemanalQuarta' || condicao === 'SemanalQuarta e Quinta') {
        const proximaQuarta = proximoDiaDaSemana(dia, 3)
        return proximaQuarta
    }
    if (condicao === 'SemanalQuinta') {
        const proximaQuinta = proximoDiaDaSemana(dia, 4)
        return proximaQuinta
    }
    if (condicao === 'SemanalSexta') {
        const proximaSexta = proximoDiaDaSemana(dia, 5)
        return proximaSexta
    }
    if(condicao === 'MensalSexta'){
        const proximaSexta = proximoDiaDaSemana(dia, 5)
        return proximaSexta
    }
    const arraySextasThis = getDayThisMonth(dia, 5, 0)
    const arraySextasNext = getDayThisMonth(dia, 5, 1)
    if (condicao === 'MensalPrimeira Sexta' ) {
        if (dia >= arraySextasThis[0]) {
            return arraySextasNext[0]
        }
        if (dia < arraySextasThis[0]) {
            return arraySextasThis[0]
        }
    }
    if (condicao === 'MensalSegunda Sexta') {
        if (dia >= arraySextasThis[1]) {
            return arraySextasNext[1]
        }
        if (dia < arraySextasThis[1]) {
            return arraySextasThis[1]
        }
    }
    if (condicao === 'MensalTerceira Sexta') {
        if (dia >= arraySextasThis[2]) {
            return arraySextasNext[2]
        }
        if (dia < arraySextasThis[2]) {
            return arraySextasThis[2]
        }
    }
    if (condicao === 'MensalÚltima Sexta') {
        if (dia >= arraySextasThis[4]) {
            return arraySextasNext[4]
        }
        if (dia < arraySextasThis[4]) {
            return arraySextasThis[4]
        }
        if (dia >= arraySextasThis[3]) {
            return arraySextasNext[3]
        }
        if (dia < arraySextasThis[3]) {
            return arraySextasThis[3]
        }
        if (dia >= arraySextasThis[2]) {
            return arraySextasNext[2]
        }
        if (dia < arraySextasThis[2]) {
            return arraySextasThis[2]
        }
    } else {
        const proximaSexta = proximoDiaDaSemana(dia, 5)
        return proximaSexta
    }
}

const objectPrevisoes = (baseSheet) => {
    const result = baseSheet.map(item => {
        const {vencimento, status, baixa, condPagamento } = item
        const cobrancaAtrasada = (vencimento, status, baixa, condPagamento) => {
            if(status === 'Baixado') return stringToData(baixa)
            if(new Date() < stringToData(vencimento)) return proximaDataCobranca(new Date(), condPagamento)
        }
        return {
            proximaCobranca: proximaDataCobranca(stringToData(vencimento), condPagamento),
            cobrancasAtrasadas: cobrancaAtrasada(vencimento, status, baixa, condPagamento)
        }
    })
    return result
}

module.exports = objectPrevisoes    