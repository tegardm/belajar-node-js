const express = require('express')
const { loadContact, findContact, addContact,cekDuplikat } = require('./utils/contacts')
const app = express()
const port = 3000
const {body, validationResult, check} = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')

// Konfigurasi Flash
app.use(cookieParser('secret'));
app.use(session({
    cookie : {MaxAge :6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true

})
)
app.use(connectFlash());

// Gunakan Ejs
app.set('view engine','ejs')



// Built In Middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))

// Home Page
app.get('/', (req, res) => {
console.log(req.baseUrl)
const mahasiswa = [
    {nama : "Tegar Deyustian", email : "tegardm@gmail.com"},
    {nama : "Risky Mustofa", email : "mustofa@gmail.com"},
    {nama : "Denandra Astari", email : "astari@gmail.com"}

]
res.render('index',{name : "Risky Narendra",
     title : "EJS Title Home", mahasiswa})

     
})

// About Page
app.get('/about', (req, res) => {
    res.render('about', {title : "Halaman About"})
    // console.log("About")
    // res.sendFile('./about.html', {root:__dirname})
})


// Contact Page
app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {title : "Halaman Contact", contacts, msg : req.flash('msg')})

})

// Form Tambah Contact
app.get('/contact/add', (req,res) => {
    res.render('add-contact', {title : "Form Tambah Kontak"})
})

// Proses Data Contact
app.post('/contact',[
    check('email','Maaf Itu Bukan Email').isEmail(),
    check('nohp',"Nomer Hp Tidak valid").isMobilePhone('id-ID'),
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if (duplikat) {
            throw new Error('Maaf, Nama Tersebut Sudah Ada')
        }
        return true;

    })],
    (req,res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.render('add-contact',{title : "Form Add Contact",errors: error.array()})
                // return res.status(400).json({ errors: error.array() })
        } else {
            addContact(req.body)
            req.flash('msg','Data Contact Berhasil Ditambahkan!')
            res.redirect('/contact')
        }
   
    // Validasi Nama Tidak Boleh Sama
    // const contacts = loadContact();
    // const isNamaExist = contacts.find(contact => contact.nama.toLowerCase() == req.body.nama.toLowerCase())
    // if (isNamaExist) {
    //     console.log(`Maaf Data ${req.body.nama} Sudah Ada`)
    //     res.redirect('/contact/add')
    // } else {
    //     
    // }

    

})

// Contact Details
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('detail', {title : "Halaman Detail Contact",contact})

})


// Default Page
app.use('/',(req,res) => {
    res.status(404)
    res.send("<h1>404</h1>")
})

// Aktifkan Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})