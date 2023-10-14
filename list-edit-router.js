const express = require('express');
const router = express.Router();
const tareas = require('./tareas.json'); // Importa el archivo JSON

// Middleware para manejar errores en solicitudes POST y PUT


router.use((req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && (!req.body || Object.keys(req.body).length === 0)) {
    res.status(400).json({ message: 'El cuerpo de la solicitud no puede estar vacío' });
  } else {
    if (req.method === 'POST') {
      const nuevaTarea = req.body;
      if (!nuevaTarea.nombre || !nuevaTarea.descripcion) {
        res.status(400).json({ message: 'La solicitud POST debe incluir nombre y descripción' });
      } else {
        next();
      }
    } else if (req.method === 'PUT') {
      const nuevaData = req.body;
      if (Object.keys(nuevaData).length === 0) {
        res.status(400).json({ message: 'La solicitud PUT debe incluir datos válidos para actualizar' });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});


// Ruta para crear una tarea
router.post('/crear', (req, res) => {
  const nuevaTarea = req.body;
  tareas.push(nuevaTarea);

  res.json({ message: 'Tarea creada con éxito', tarea: nuevaTarea });
});

// Ruta para eliminar una tarea por su ID
router.delete('/eliminar/:id', (req, res) => {
  const tareaId = req.params.id;
  const tareaIndex = tareas.findIndex((tarea) => tarea.id === tareaId);
  if (tareaIndex !== -1) {
    tareas.splice(tareaIndex, 1);
    res.json({ message: 'Tarea eliminada con éxito' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Ruta para actualizar una tarea por su ID
router.put('/actualizar/:id', (req, res) => {
  const tareaId = req.params.id;
  const tareaIndex = tareas.findIndex((tarea) => tarea.id === tareaId);
  if (tareaIndex !== -1) {
    const nuevaData = req.body;
    tareas[tareaIndex] = { ...tareas[tareaIndex], ...nuevaData };
    res.json({ message: 'Tarea actualizada con éxito', tarea: tareas[tareaIndex] });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

module.exports = router;





