const express = require("express");
//criar rota 
const router = express.Router();
const cors = require("cors");

//rotas 
const users = [];// aplicaçao stateful

const app = express();

//trafegar dados jsons
app.use(express.json());
app.use(cors());

//criar rota

// get=> fornecer dados para o front-end
const getUsers = router.get ('/users', (req, res) => {
  res.status(200).json(users);
});
// POST => criar um dado, quando informaçoes forem fornecidas pelo front 
const createUser = router.post('/users', (req, res) =>{
  const user = {
    id: req.body.is,
    name: req.body.name,
  }
  users.push(user)
  const usersUpadet = [...users, user];
  // erro: falta a aspas no user.name
  res.status(201).json({messge: 'User ${user.name} created successfully'});

//servidor
app.use(createUser);
app.listen(3333, console.log("Servidor rodando com sucesso!"));

