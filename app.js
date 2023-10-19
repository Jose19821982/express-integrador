const express = require('express');
const app = express();
const jwt = require ('jsonwebtoken');
const tareas = require('./tareas.json'); // Importa el archivo JSON
const dotenv = require('dotenv');


// Importa los routers
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Middleware para el manejo de JSON en las solicitudes POST y PUT
app.use(express.json());

//Autenticacion
const usuario = {
  user : "admin",
  password : "password123"
}

const LLAVE_SECRETA = 'holaAdaSchool'

app.post ('/login', (req , res) =>{
  const user = req.body.user
  const pass = req.body.password

  if(user === usuario.user && pass === usuario.password){

      const pyload = {
          rol : 'Cobrador'
      }
       const token = jwt.sign (pyload,LLAVE_SECRETA);
       return res.status(200).send({message : 'Bienvenido a este Nuevo Mundo', token })
  }else{
      return res.status(403).send({message:'El usuario o clave son incorrectos'})
  }
})

app.use((req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(req.method)) {
    res.status(400).json({ message: 'Método HTTP no válido' });
  } else {
    next();
  }
});

// Rutas principales
app.use('/tareas', listViewRouter);
app.use('/tareas', listEditRouter);

const port = 8000; // El puerto en el que se ejecutará el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});








