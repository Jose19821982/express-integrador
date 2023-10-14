const express = require('express');
const router = express.Router();
const tareas = require ('./tareas.json');

router.use((req, res, next) => {
  if (req.method === 'POST') {
    const nuevaTarea = req.body;
    if (!nuevaTarea || isNaN(nuevaTarea.id)) {
      res.status(400).json({ message: 'El campo "id" en la solicitud POST debe ser un número válido' });
    } else {
      next();
    }
  } else {
    next();
  }
});



//Ruta pare poder listar las tareas 
router.get ('/todas', (req , res) =>{
  res.json(tareas);
})

//Ruta para poder listar las tareas completas
router.get ('/completas', (req , res) => {
const tareasCompletas = tareas.filter ((tarea) => tarea.isCompleted===true);
res.json(tareasCompletas);
});

//Ruta para poder listar las tareas incompletas
router.get ('/incompletas', (req , res)=>{
  const tareasIncompletas = tareas.filter ((tarea)=> tarea.isCompleted===false);
  res.json (tareasIncompletas);
})


module.exports = router;









