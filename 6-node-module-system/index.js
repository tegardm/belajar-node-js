// const nama = "Tegar Deyustian"
// const cetakNama = (name) => `Halo Nama Saya Adalah ${name} Terimakasih.`
// console.log(cetakNama("Risky febrian"))
// console.log(window)
// const moment = require('moment') // third-party module
const fs = require('fs'); // core module
const cobaData = require('./coba.js')
const {nama, umur, cetakNama} = cobaData.mahasiswa;
const {call, PI} = require('./coba.js') // import local module
// const PI = require('./coba.js')
// console.log("Hello WPU")
// console.log(cobaData)

console.log(call("Eskalatarotik"), PI, cetakNama(nama, umur), new cobaData.Orang());
