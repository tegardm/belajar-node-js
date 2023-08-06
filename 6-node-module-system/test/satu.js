setTimeout(() => {
    console.log("This is Asyncronous Function")
}, 3000)

console.log(window.alert("Hello Dunia !"))

function cetakNama (name) {
    return `Halo Nama Saya ${name} Terimakasih !`
}

(function () {
    console.log("Anonymous Function")
})();
