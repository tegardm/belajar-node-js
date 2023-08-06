console.log('Hello World')
const call = (x) => `Halo Nama Saya ${x}` // local module
const PI = 3.14;

const mahasiswa = {
    nama : "Tegar Wahyudi",
    umur : 40,
    cetakNama (name,age) {
        return `Halo Nama Saya ${name} Saya Berusia ${age}`
    }
}

class Orang {
    constructor () {
        console.log("Ini Adalah Class Orang")
    }
}

// module.exports.call = call;
// module.exports.PI = PI;
// module.exports.mhs = mahasiswa;
// module.exports.Orang = Orang;

module.exports = {call, PI, mahasiswa, Orang}