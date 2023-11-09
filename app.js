const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const db=require('./db');


// Habilita DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para analizar solicitudes JSON
app.use(express.json());
const usuarioscontroller=require('./controladores/usuarios');
// Ruta para listar todos los productos
app.get('/usuarios',usuarioscontroller.listarUsuarios);
  
  // Ruta para agregar un nuevo producto
  app.post('/usuarios/nuevo',usuarioscontroller.agregarUsuarios);
  
  // Ruta para editar un producto existente
  app.put('/usuarios/:id/editar', usuarioscontroller.editarUsuarios);
  
  // Ruta para eliminar un producto
  app.delete('/usuarios/:id/eliminar',usuarioscontroller.eliminarUsuario);



app.post('/api/datos', (req, res) => {
  const { dato } = req.body;
  if (!dato) {
    res.status(400).send('Dato no válido');
    return;
  }

  // Insertar datos en la base de datos
  db.query('INSERT INTO tabla_datos (dato) VALUES (?)', [dato], (error, result) => {
    if (error) {
      console.error('Error en la consulta: ' + error.message);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.status(201).send('Dato insertado correctamente');
  });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor Express escuchando en el puerto ${PORT}');
});