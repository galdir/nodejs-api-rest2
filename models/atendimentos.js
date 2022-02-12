const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Atendimento {
    adiciona(atendimento, res) {
        //const dataAgendamento = new Date()
        const dataAgendamento = new moment().format('YYYY-MM-DD HH:MM:SS')
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataEhValida = moment(dataAtendimento).isSameOrAfter(dataAgendamento)
        const clienteEhValido = atendimento.cliente.length >= 3
        const validacoes = [
            {
                nome: 'dataAgendamento',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'O nome do cliente deve ter pelo menos 3 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
            console.log(erros)
        } else {

            atendimento.dataAtendimento = dataAtendimento
            const atendimentoDatado = { ...atendimento, dataAgendamento }


            const sql = 'INSERT INTO ATENDIMENTOS SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro) {
                    console.log(erro)
                    res.status(400).json(erro)
                } else {
                    console.log(resultado)
                    //res.status(201).json(resultado)
                    res.status(201).json(atendimentoDatado)
                }
            })
        }
    }

    lista(res){

        const sql='SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultado)
            }
        })

    }

    buscaPorId(id, res){
        console.log(id)
        const sql = `SELECT * FROM ATENDIMENTOS WHERE id=${id}`

        conexao.query(sql, (erro, resultado) => {
            const atendimento=resultado[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    alterarAtendimento(id, valores, res){
        if(valores.dataAtendimento){
            valores.dataAtendimento = moment(valores.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
       
        const sql = 'UPDATE ATENDIMENTOS SET ? WHERE ID=?'

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                //res.status(200).json(resultado)
                res.status(200).json({...valores, id})
            }
        })

    }

    cancelarAtendimento(id, res){
        const sql = 'DELETE FROM ATENDIMENTOS WHERE ID=?'

        conexao.query(sql, id, (erro,resultado) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })

    }
}

module.exports = new Atendimento