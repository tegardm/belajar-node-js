const express = require('express')
const app = express();
const Contact = require('./model/contact')
const {body, validationResult, check} = require('express-validator')
const methodOverride = require('method-override')
require('./utils/db');

const port = 3000;

app.use(methodOverride('_method'));

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
    // console.log(req.baseUrl)/
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

// Form Tambah Contact
app.get('/contact/add', (req,res) => {
    res.render('add-contact', {title : "Form Tambah Kontak"})
})

// Delete Contact
// app.get('/contact/delete/:nama', async (req,res) => {
//     const contact = await Contact.findOne({nama : req.params.nama})
//     // Jika contact tidak ada
//     if (!contact) {
//         res.status(404);
//         res.send("<h1>404</h1>")
//     } else {
//         Contact.deleteOne({_id : contact._id})
//         .then ((result) => {
//             req.flash('msg',`Data Kontak ${contact.nama} Berhasil Dihapus!`)
//             res.redirect('/contact')
//         }).catch(err => console.log(err))
       
           
//     }
// })

app.delete('/contact',async (req,res) => {
    await Contact.deleteOne({nama : req.body.nama}).then(result => {
        req.flash('msg',`Data Kontak ${req.body.nama} Berhasil Dihapus!`)
            res.redirect('/contact')
    })

})

// Form Ubah Data Contact
app.get('/contact/edit/:nama', async (req,res) => {
    const contact = await Contact.findOne({nama : req.params.nama})
    // console.log(contact)
    // res.send('ok')
    res.render('edit-contact', {title : "Form Ubah Kontak", contact})
})

// Proses ubah data
app.put('/contact',[
    check('email','Maaf Itu Bukan Email').isEmail(),
    check('nohp',"Nomer Hp Tidak valid").isMobilePhone('id-ID'),
    body('nama').custom(async (value, {req}) => {
        const duplikat = await Contact.findOne({nama : value});
        if (duplikat && value !== req.body.oldNama) {
            throw new Error('Maaf, Nama Tersebut Sudah Ada')
        } 
        return true;

    })],
    (req,res) => { 
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.render('edit-contact',{title : "Form Edit Contact",errors: error.array(), contact : req.body})
                // return res.status(400).json({ errors: error.array() })
        } else {
            Contact.updateOne({_id : req.body._id},
                {
                    $set : {
                        nama : req.body.nama,
                        email : req.body.email,
                        nohp : req.body.nohp
                    }
                }).then((result) => {
                    req.flash('msg','Data Contact Berhasil Dirubah!')
                    res.redirect('/contact')
                })
            
        }
})



// Proses Data Contact
app.post('/contact',[
    check('email','Maaf Itu Bukan Email').isEmail(),
    check('nohp',"Nomer Hp Tidak valid").isMobilePhone('id-ID'),
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({nama : value});
        if (duplikat) {
            throw new Error('Maaf, Nama Tersebut Sudah Ada')
        }
        return true;

    })],
    (req,res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.render('add-contact',{title : "Form Add Contact",errors: error.array()})
        } else {
             Contact.insertMany(req.body)
            .then(() => {
                req.flash('msg','Data Contact Berhasil Ditambahkan!')
                res.redirect('/contact')
            }).catch((err) => {
                console.log(err)
            })
            
        }

    

})

// Contact Details
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama : req.params.nama})
    res.render('detail', {title : "Halaman Detail Contact",contact})

})


app.listen(port, () => {
    console.log(`Listening Mongo Contact App | http://localhost:${port}`)
})