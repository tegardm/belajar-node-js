const express = require('express')
const app = express()
const port = 3000

// Gunakan Ejs
app.set('view engine','ejs')

app.get('/product/:id',(req,res) => {
    const productId = req.params.id
    const category = req.query.category ? req.query.category : "Default"
   res.render('product', {title : "Product", productId, category})
    // const productId = req.params.id;
    // const category = req.query.category
    // res.send(`Product ID : ${req.params.id}<br>Category ID : ${category}`)

})

app.get('/', (req, res) => {
console.log(req.baseUrl)
// res.sendFile('./index.html', {root:__dirname})
const mahasiswa = [
    {nama : "Tegar Deyustian", email : "tegardm@gmail.com"},
    {nama : "Risky Mustofa", email : "mustofa@gmail.com"},
    {nama : "Denandra Astari", email : "astari@gmail.com"}

]
res.render('index',{name : "Risky Narendra",
     title : "EJS Title Home", mahasiswa})

})
app.get('/about', (req, res) => {
    res.render('about', {title : "Halaman About"})
    // res.sendFile('./about.html', {root:__dirname})
})
app.get('/contact', (req, res) => {
    // res.sendFile('./contact.html', {root:__dirname})
    res.render('contact', {title : "Halaman Contact"})

})

app.use('/',(req,res) => {
    res.status(404)
    res.send("<h1>404</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})