const express = require('express')
const app = express();
const Contact = require('./model/contact')
require('./utils/db');

const port = 3000;

const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')

// Use Templating Engine
app.set('view engine','ejs')

// Middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))

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


// Halaman Home
app.get('/', (req, res) => {
    console.log(req.baseUrl)
    const mahasiswa = [
        {nama : "Tegar Deyustian", email : "tegardm@gmail.com"},
        {nama : "Risky Mustofa", email : "mustofa@gmail.com"},
        {nama : "Denandra Astari", email : "astari@gmail.com"}
    
    ]
    res.render('index',{name : "Risky Narendra",
         title : "EJS Title Home",
          mahasiswa
    })
    
         
    })

// About Page
app.get('/about', (req, res) => {
    res.render('about', {title : "Halaman About"})
    // console.log("About")
    // res.sendFile('./about.html', {root:__dirname})
})


// Contact Page
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find()
    res.render('contact', {title : "Halaman Contact", contacts, msg : req.flash('msg')})

})

// Contact Details
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama : req.params.nama})
    res.render('detail', {title : "Halaman Detail Contact",contact})

})


app.listen(port, () => {
    console.log(`Listening Mongo Contact App | http://localhost:${port}`)
})