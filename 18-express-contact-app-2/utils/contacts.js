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

const addContact = (body) => {
   if (body) {
    const contacts = loadContact();
    contacts.push(body)
    const contactsJSON = JSON.stringify(contacts, null, 3);
    fs.writeFileSync(filePath,contactsJSON,'utf-8')

    return "Data Berhasil Ditambahkan !";

   } else {
    return "Data Gagal Ditambahkan !"
   }
}

const cekDuplikat = (value) => {
    const contacts = loadContact();
    const cek = contacts.find((contact) => contact.nama.toLowerCase() === value.toLowerCase())
    return cek;
}
module.exports = {loadContact, findContact,addContact,cekDuplikat}