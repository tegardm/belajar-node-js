const fs = require('fs');

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
} 

const filePath = './data/contact.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath,'[]', 'utf-8')
} 

const saveContacts = (contacts) => {
    const contactsJSON = JSON.stringify(contacts, null, 3);
    fs.writeFileSync(filePath,contactsJSON,'utf-8')
    console.log("Data Berhasil Disimpan")
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
    saveContacts(contacts)

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

const deleteContact = (nama) => {
    const contacts = loadContact();
    const filteredContacts  = contacts.filter(contact => contact.nama.toLowerCase() !== nama.toLowerCase())
    if (filteredContacts.length !== contacts.length) {
        saveContacts(filteredContacts);
        return true;
    } else {
        return false;
    }
   
}

const updateContact = (contactBaru) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter(contact => contact.nama !== contactBaru.oldNama);
    delete contactBaru.oldNama;
    filteredContacts.push(contactBaru)
    saveContacts(filteredContacts);
}
module.exports = {loadContact, updateContact,findContact,addContact,cekDuplikat, deleteContact}