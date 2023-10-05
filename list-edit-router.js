const express = require('express');
const router = express.Router();
const tareas = require('./tareas.json'); // Importa el archivo JSON

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