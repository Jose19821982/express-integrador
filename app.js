const express = require('express');
const app = express();
const tareas = require('./tareas.json'); // Importa el archivo JSON

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

const port = 8000; // El puerto en el que se ejecutará el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});





