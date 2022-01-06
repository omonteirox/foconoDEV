const express = require('express')
const app = express()
const PORT = 8080
app.set('view engine', 'ejs') // falando que a view engine é o EJS
app.use(express.static('public'))
app.get("/:nome/:lang",(req,res)=>{
    // res.send("Site? xD")
    let nome = req.params.nome
    let lang = req.params.lang
    let showMSG = false
    let produtos = [
        {nome:"Abobrinha",preco:1},
        {nome:"Arroz",preco:350.2},
        {nome:"Feijon",preco:20.2},
        {nome:"Salueda",preco:10},
        {nome:"Salueda de bacate",preco:1000},
        {nome:"Salueda de alfuace",preco:50}
    ]
    res.render("index",{
        nome: nome,
        lang: lang,
        empresa: 'Nenhuma',
        msg : showMSG,
        prod : produtos
    }) // Usando o Render você consegue renderizar o ejs
})
app.listen(PORT,()=>{console.log(`Running at localhost:${PORT}`);})