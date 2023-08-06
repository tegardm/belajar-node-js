const mongoose = require('mongoose')

// Membuat Schmea Database
const Contact = mongoose.model('contact', {
    nama : {
        type : String,
        required : true
    },
    nohp : {
        type : String,
        required : true
    },
    email : {
        type : String
    }
})

module.exports = Contact