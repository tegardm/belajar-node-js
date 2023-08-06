const fs = require('fs');

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
} 

const filePath = './data/contact.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath,'[]', 'utf-8')
} 

const loadContact = () => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8');
    const contacts = JSON.parse(fileBuffer)
    return contacts
}

const findContact = (nama) => {
   const contacts = loadContact();
   const data =  contacts.find(ctc => {
        return ctc.nama.toLowerCase() == nama.toLowerCase()
   })

    return data
    
}
module.exports = {loadContact, findContact}