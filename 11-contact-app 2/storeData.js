const fs = require('fs')
const filePath = './data/contact.json'

const sendData = (jsonData) => {
    fs.writeFileSync(filePath, jsonData, 'utf-8')
}

module.exports = sendData;