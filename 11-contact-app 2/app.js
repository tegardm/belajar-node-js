const yargs = require("yargs")
const contactFunc = require('./contacts')
// console.log(process.argv)

// console.log(yargs.argv)

yargs.command({
    command : 'add',
    describe : 'Menambahkan Contact Baru',
    builder : {
        nama : {
            describe : "Nama Lengkap",
            demandOption : true,
            type : 'string'
        }, 
        email : {
            describe : "Email User",
            demandOption : false,
            type : 'string'
        },
        noHP : {
            describe : "Nomer HP User",
            demandOption : true,
            type : 'string'
        }
    },
    handler (argv) {
        const contact = {
            nama : argv.nama,
            email : argv.email,
            hp : argv.noHP
        }
       
        contactFunc.simpanKontak(contact.nama,contact.email,contact.hp)
        
    }
})
.demandCommand(); 

// Menampilkan Daftar semua nama & no hp contact
yargs.command({
    command : "list",
    describe : "Menampilkan seluruh daftar nama dan nomer HP user",
    handler () {
        contactFunc.listContact();
    }
})

// Menampilkan detail dari sebuah kontak berdasarkan input nama
yargs.command({
    command : "detail",
    describe : "Menampilkan detail data user berdasarkan nama",
    builder : {
        nama : {
            describe : "Nama user yang ingin di cek detailnya",
            demandOption : true,
            type : "string"
        }
    },
    handler (argv) {
        contactFunc.detailContact(argv.nama);
    }
})

// Menghapus data contact dari list contact yang ada berdasarkan nama
yargs.command({
    command : "delete",
    describe : "Menghapus data user berdasarkan nama",
    builder : {
        nama : {
            describe : "Nama user yang ingin data nya di hapus",
            demandOption : true,
            type : "string"
        }
    },
    handler (argv) {
        contactFunc.deleteContact(argv.nama);
    }
})

yargs.parse()