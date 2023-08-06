const fs = require('fs')
const filePath = './data/contact.json'

const existingData = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}  

module.exports = existingData;