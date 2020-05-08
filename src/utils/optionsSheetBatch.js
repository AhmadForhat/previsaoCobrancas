const optionsBatchGet = (intervalos) =>{
    return {
        method: 'GET',
        url: process.env.SHEET_URL,
        data: {
            apiResource: 'values',
            apiMethod: 'batchGet',
            spreadsheetId: process.env.SHEET_ID,
            ranges: intervalos
        },
        headers: {
            'Authorization': process.env.SHEET_TOKEN,
            'Content-Type': 'application/json',
            'Origin': 'https://ziro.app'    
        },
        json: true
    }
}

module.exports = optionsBatchGet