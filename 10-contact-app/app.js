// Core Module : File System
const {pertanyaan, simpanKontak} = require('./contacts')

const main = async () => {
    const nama = await pertanyaan("Masukan Nama Anda : ");
    const email = await pertanyaan("Masukan Email Anda : ");
    const hp = await pertanyaan("Masukan No HP Anda : ");

    simpanKontak(nama,email,hp);
 
}

main();

// rl.question("Siapakah Nama Anda ? ", (jawaban1) => {
//     rl.question("NO HP Anda ? ",(jawaban2) => {
//         rl.question("NIM Anda ? ", (jawaban3) => {
//             const newData = {
//                 name : jawaban1,
//                 phone_number : jawaban2,
//                 nim : jawaban3
//             }

       


         
//             fs.readFile('data/contact.json','utf-8', (err,data) => {
//                 if (err) throw err;
//                 const existingData = JSON.parse(data);

//                 existingData.push(newData)
//                 const jsonData = JSON.stringify(existingData,null,3);

//                 fs.writeFile('data/contact.json',jsonData,'utf-8', (err) => {
//                     if (err) throw err;
//                     console.log("Data Berhasil Dituliskan Kedalam JSON")
//                 })

//             })
//             rl.close();
//         })
//     })
    
// })



