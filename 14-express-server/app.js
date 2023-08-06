const express = require('express')
const app = express()
const port = 3000

app.get('/product/:id',(req,res) => {
    res.send(`Product ID : ${req.params.id}<br>Category ID : ${req.query.category}`)
})

app.get('/', (req, res) => {
//   res.send('<h1>Hello Express!</h1>')
//   res.json({
//     nama : "Tegardm",
//     email : "tegardm@gmail.com",
//     noHP : "0813984793846"

//   })
// res.sendStatus(200)
console.log(req.baseUrl)
res.sendFile('./index.html', {root:__dirname})

})
app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root:__dirname})
})
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root:__dirname})
})

app.use('/',(req,res) => {
    res.status(404)
    res.send("<h1>404</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// const http = require('http')
// const fs = require('fs')

// const renderHTML = (path,res) => {
//     fs.readFile(path,(err,data) => {
//         if (err) {
//             res.writeHead(404)
//             res.write("Eaaaa")
//         } else {
//             res.write(data)
//         }
//         res.end()
//     })
// }

// http
//     .createServer((req,res) => {
//         const url = req.url;
//         // console.log(url)
//         res.writeHead(200, {
//             'Content-Type':'text/html'
//         })
        
//         if (url === '/about') {
//             renderHTML('./about.html',res)
//         } else if (url === '/contact'){
//             renderHTML('./contact.html',res)
//         }else {
//            renderHTML('./index.html',res)
//         }
       
//     })
//     .listen(3000, () => {
//         console.log("Server is listening on port 3000..")
//     })