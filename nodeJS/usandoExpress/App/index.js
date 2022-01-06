const express = require('express')
const app = express()
const port = 8080

app.get('/',(req,res) =>{
    res.send("<h1>Tô rodando lek esquece estourado<\h1>")
})
app.get('/xd',(req,res) =>{
    res.send("<h1>XXDXDXDXDXDXDXDXDXDXDXDXD</h1>")
})
app.listen(port,(err)=>{
    if (err) {
        console.log(`Erro !!!! \n ${err}`);
    }else{
        console.log(`Xubalauuuuu tô sendo executado aqui localhost:${port}`);
    }
})
// tratando informações
app.get("/dx/:informacao?",(req,res)=>{
    let recebido = req.params.informacao
    if (recebido) res.send(`seu param foi <h1>${recebido}</h1> `)
    else res.send(`<h1>Sem nenhuma informação</h1>`)
})
// usando query params
// Exemplo -> www.site.com.br/rota/?informacao1=10
// Você não define ele na rota
app.get("/queryparam",(req,res)=>{
    let informacoes = req.query["info1"]
    if (!informacoes)
    res.send("Sem nenhuma informação amigão")
    else
    res.send(`Sua informação foi essa -> ${informacoes}`)
})