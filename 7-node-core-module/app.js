// Core Module : File System
const fs = require('fs');
const { stdout } = require('process');

// menuliskan string file secara sinkronus & asinkronus
// fs.mkdirSync('./data')
// fs.rmdirSync('./data')
// try {
//     fs.writeFileSync('data/test.txt','Hello World Secara Syncrhonous Ea!')
// } catch (e) {
//     console.log("Error Mas Bro Cek Maneh Kode Samean")
//     console.log(e)
// }

// fs.writeFile('data/textAsync.txt','Data Ini Dituliskan Secara Asynchronous !', (e) => {
//     if (e) throw "Ada Yang Error Mas Bro";
//     console.log("Data Saved")
// })

//  Membaca String File secara sinkronus & asinkronus
// fs.readFile('data/textAsync.txt',(e,data) => {
//     if (e) throw "Onok Error Mas Bro Yo Opo Samean";
//     // console.log('Data Loaded Async')
//     console.log(data.toString())
// })

// const data = fs.readFileSync('data/test.txt','utf-8');
// console.log(data)

// readline
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.question("Siapakah Nama Anda ? ", (jawaban1) => {
    rl.question("NO HP Anda ? ",(jawaban2) => {
        rl.question("NIM Anda ? ", (jawaban3) => {
            const newData = {
                name : jawaban1,
                phone_number : jawaban2,
                nim : jawaban3
            }

            fs.readFile('data/contact.json','utf-8', (err,data) => {
                if (err) throw err;
                const existingData = JSON.parse(data);

                existingData.push(newData)
                const jsonData = JSON.stringify(existingData,null,3);

                fs.writeFile('data/contact.json',jsonData,'utf-8', (err) => {
                    if (err) throw err;
                    console.log("Data Berhasil Dituliskan Kedalam JSON")
                })

            })
            rl.close();
        })
    })
    
})



