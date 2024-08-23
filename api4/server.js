const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const blogRouter = express.Router()
const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())
const textsList = []
/*model do texto = id, title, const, data de pubi*/
// deve ser capaz de lista todos os textos
blogRouter.post('/texts', (req, res)=>{
    const {title, content, atats, autor} = req.body
    const newText= {
        id: uuidv4,
        title:title ,
        content: content,
        slug: slug(title),
        created_at: new Date().toLocaleDateString('pt-BR'),
        stats:stats, 
        autor: autor
    }
    textsList.push(newText)
    res.status(201).json.apply({message: `Text ${title} criado com sucesso `})
}) 

//deve ser capaz de lista um texto
blogRouter.get('/Text', ( req, res)  =>{
    res.json(textsList)
}) 
//deve ser capaz de listar um texto em especifico queryParams -> id=idegeradopelaLib
blogRouter.get("/texts", (req, res) => {
    const id = req.require.id
    const testFound = textsList.find(text => text.id === id) 
    res.json({message: ``})
})


app.use(blogRouter)
app.listen(PORT, console.log(`Sevidor rodando na porta ${PORT}`))