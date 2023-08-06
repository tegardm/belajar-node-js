const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
} 

const filePath = './data/contact.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath,'[]', 'utf-8')
} 

const pertanyaan = (quest) => {
    return new Promise((resolve,reject) => {
        rl.question(quest, (nama) => {
            resolve(nama)
        })
    })
}

const simpanKontak = (nama,email,hp) =>{
   try {
    const existingData =  JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log("Data Berhasil Di Baca")
    const newData = {nama,email,hp}
    existingData.push(newData)
    const jsonData = JSON.stringify(existingData,null,3);

    try {
        
        fs.writeFileSync(filePath, jsonData, 'utf-8')
        console.log("Data Berhasil Dituliskan Kedalam JSON")
    
       } catch (err) {
        console.log(err)
       }
   } catch(err) {
    console.log(err)
   }

 
 

    // fs.readFile(filePath,'utf-8', (err,data) => {
    //     if (err) throw err;
    //     const existingData = JSON.parse(data);
    //     const newData = {nama,email,hp}
    //     existingData.push(newData)
    //     const jsonData = JSON.stringify(existingData,null,3);

    //     fs.writeFile(filePath,jsonData,'utf-8', (err) => {
    //         if (err) throw err;
    //         console.log("Data Berhasil Dituliskan Kedalam JSON")
    //     })

    // })
    rl.close();
}


module.exports = {pertanyaan, simpanKontak}
