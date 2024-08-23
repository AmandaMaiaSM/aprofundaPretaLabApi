// DELETE -> apaga uma informação de acordo com um identificador
// PUT -> edita uma informação de acordo com um identificador, precisa enviar todos os campos
// PATCH ->  edita uma ou mais propriedades em informação de acordo com um identificador
// GET -> busca/pega informação (disponibiliza para o front)
// POST -> cria uma informação

// criando configuraçoes 
const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

//criar rotas 
const routerDisciplinas = express.Router()
const PORT = 3333

//instancia 
const app = express()
app.use(express.json())
app.use(cors())

const list = []
//métodos de array (map, filter, find, reducer, some)
// push, length, split, 

//GET 
routerDisciplinas.get('/disciplinas', (req, res) => {
  res.json(list)
})

//POST
routerDisciplinas.post('/disciplinas', (req, res) => {
  const novaDisciplina = {
    id: uuidv4(),
    titulo: req.body.titulo,
    modulo: req.body.modulo
  }

  const verificaSeExiste = list.find(item => item.titulo === req.body.titulo)

  if (verificaSeExiste) {
    return res.status(403).json({ message: `Disciplina ${req.body.titulo} já existe na lista` })
  }

  list.push(novaDisciplina)
  res.status(201).json({ message: `disciplina ${req.body.titulo} criada com sucesso!`})
})

//DELETE
routerDisciplinas.delete('/disciplina/:id', (req, res) => {
  const listaAtualizada = list.filter(item => item.id !== req.params.id)
  res.json(listaAtualizada)
})

//PUT: 
routerDisciplinas.put('/disciplina/:id', (req, res) =>{
  let  encontraDisciplina = list.find( item => item.id === req.params.id)
  
  if (!encontraDisciplina){
    res.status(404).json({message: ` Item não econtrado`})
  }
  
  encontraDisciplina.titulo = req.body.titulo
  encontraDisciplina.modulo = req.body.modulo

  res.json({message: `Disciplina ${req.body.titulo} alterado com sucesso`})

})

//PATCH
routerDisciplinas.put('/disciplina/:id', (req, res) =>{
  const {titulo, modulo} = req.body;

  let  encontraDisciplina = list.find( item => item.id === req.params.id)
  
  if (!encontraDisciplina){
    res.status(404).json({message: ` Item não econtrado`})
  }
  
  if (titulo != null){
    encontraDisciplina.titulo = titulo
  }
  if (modulo != null){
    encontraDisciplina.modulo = modulo
  }


  res.json({message: `Disciplina ${req.body.titulo} alterado com sucesso`})

})

app.use(routerDisciplinas)//passar rotas 
app.listen(PORT, console.log(`servidor rodando na porta ${PORT}`))