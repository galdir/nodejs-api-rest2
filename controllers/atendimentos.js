const Atendimento = require('../models/atendimentos')

module.exports = app => {
    //app.get('/atendimentos', (req, res) => res.send('voce esta na rota de atendimentos, e esta realizando um get'))
    app.get('/atendimentos', (req,res) =>{
        Atendimento.lista(res)
    })
    app.get('/atendimentos/:id', (req,res)=>{
        const id = parseInt(req.params.id)
        //console.log(req.params.id)
        Atendimento.buscaPorId(id, res)
        //res.send('ok')
    })

    app.post('/atendimentos', (req, res) => {
        //console.log('Atendimento enviado')
        //console.log(req.body)
        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)
        //res.send("voce esta na rota de atendimentos e esta fazendo um post")
    })

    app.patch('/atendimentos/:id', (req,res) =>{
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.alterarAtendimento(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req,res) =>{
        const id = parseInt(req.params.id)
        Atendimento.cancelarAtendimento(id, res)
    })

}