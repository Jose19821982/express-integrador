const express = require('express');
const app = express();
const tareas = require('./tareas.json'); // Importa el archivo JSON

// Importa los routers
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Middleware para el manejo de JSON en las solicitudes POST y PUT
app.use(express.json());

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








