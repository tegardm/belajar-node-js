const chalk = require('chalk')
const fs = require('fs');
const validator = require('validator');
const existingData = require('./getData');
const sendData = require('./storeData');

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
} 

const filePath = './data/contact.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath,'[]', 'utf-8')
} 

const simpanKontak = (nama,email,hp) =>{
   try {
    // console.log("Data Berhasil Di Baca")
    const getData = existingData();
    // Validasi Duplikat Nama
    const duplikat = getData.find((data) => data.nama === nama)
    if (duplikat) {
        console.log(chalk.red.inverse.bold(`Nama Contact ${nama} Sudah Terdaftar, Gunakan Nama Lain`))
        return false
    }

    // Validasi Email User
    const cekEmail= validator.isEmail(email);
    if (email) {
        if (!cekEmail) {
            console.log(chalk.red.inverse.bold(`Harap Masukan Email Yang Benar`))
            return false
        }
    }

    // Validasi Nomer HP
    const cekNomer = validator.isMobilePhone(hp,'id-ID')
    if (!cekNomer) {
        console.log(chalk.red.inverse.bold(`Nomer ${hp} Bukan Format Nomor Indonesia`))
        return false
    } 

    const newData = {nama,email,hp}
    getData.push(newData)
    const jsonData = JSON.stringify(getData,null,3);

    try {
        sendData(jsonData)
        // fs.writeFileSync(filePath, jsonData, 'utf-8')
        console.log(chalk.green.inverse.bold("Data Berhasil Ditambahkan, Terimakasih"))
    
       } catch (err) {
        console.log(err)
       }
   } catch(err) {
    console.log(err)
   }
}

const listContact = () => {
    const getData = existingData();

    console.log(chalk.cyan.inverse.bold(`-------=== Terdapat ${getData.length} Daftar Kontak ===-------`))
    getData.forEach((data, i) => {
        console.log(`Data ${i+1}. Nama : ${data.nama} --- ${data.hp}`)
       
    })
}

const detailContact = (name) => {
    const getData = existingData();
    let data = getData.find((data) => data.nama.toLowerCase() === name.toLowerCase())
   
    // console.log(data)

    if (!data) {
        console.log(chalk.inverse.red(`Contact dengan nama ${name} tidak ditemukan.`))
    } else {
        console.log(chalk.inverse.green(`-------=== Data Ditemukan ===-------`))
        console.log(`Nama : ${data.nama}\nNomor : ${data.hp}\nEmail : ${data.email}`)
    }
}

const deleteContact = (name) => {
    const getData = existingData();

    let data = getData.find((data) => data.nama.toLowerCase() === name.toLowerCase())
    if (!data) {
        console.log(chalk.inverse.red(`Contact dengan nama ${name} tidak ditemukan.`))
        return false;
    }

    let filteredData = getData.filter((data) => data.nama.toLowerCase() !== name.toLowerCase())

    filteredData = JSON.stringify(filteredData,null,3)
    sendData(filteredData)
    // fs.writeFileSync(filePath, jsonData, 'utf-8')
    console.log(chalk.green.inverse.bold(`Data Dengan Nama ${name} Berhasil Di Hapus`))
}


module.exports = { simpanKontak, listContact, detailContact, deleteContact}
