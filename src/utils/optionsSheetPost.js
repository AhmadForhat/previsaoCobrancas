const optionsPost = (body, destino) =>{
    return {
        method: 'POST',
        url:process.env.SHEET_URL,
        data : {
            'apiResource': 'values',
            'apiMethod': 'append',
            'spreadsheetId': process.env.SHEET_ID,
            'range': destino,
            'resource': {
                'values': body
            },
            'valueInputOption': 'user_entered'
        },
        headers: {
            'Origin': 'https://ziro.app',
            'Content-type': 'application/json',
            'Authorization': process.env.SHEET_TOKEN,
        },
        json: true
    }
}

module.exports = optionsPost