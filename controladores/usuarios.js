const db = require('../db');

exports.listarUsuarios = (req, res) => {
    db.query('SELECT * FROM usuarios', (error, results) => {
      if (error) {
        console.error('Error en la consulta: ' + error.message);
        res.status(500).send('Error en el servidor');
        return;
      }
      res.json(results);
    });
  };

 // Controlador para agregar un nuevo usuarios
exports.agregarUsuarios = (req, res) => {
    const { id, nombre, apellido, edad, tel } = req.body;
    const nuevoUsuarios = { id, nombre, apellido, edad, tel };
  
    db.query('INSERT INTO usuarios SET ?', nuevoUsuarios, (error, result) => {
      if (error) {
        console.error('Error en la consulta: ' + error.message);
        res.status(500).send('Error en el servidor');
        return;
      }
      res.status(201).json({ message: 'Usuario agregado con éxito' });
    });
  }; 

 // Controlador para editar un usuarios existente
exports.editarUsuarios = (req, res) => {
    const id = req.params.id; // Obtiene el ID del usuarios desde los parámetros de la URL
    const { nombre, apellido, edad, tel } = req.body; // Obtiene los datos actualizados desde el cuerpo de la solicitud
  
    // Realiza la actualización en la base de datos utilizando una consulta SQL UPDATE
    const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, edad = ?, tel = ? WHERE id = ?';
    db.query(sql, [nombre, apellido, edad, tel, id], (error, result) => {
      if (error) {
        console.error('Error en la consulta: ' + error.message);
        res.status(500).send('Error en el servidor');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
      }
    });
  }; 

  // Controlador para eliminar un usuarios existente
exports.eliminarUsuario = (req, res) => {
    const id = req.params.id; // Obtiene el ID del usuarios desde los parámetros de la URL
  
    // Realiza la eliminación en la base de datos utilizando una consulta SQL DELETE
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], (error, result) => {
      if (error) {
        console.error('Error en la consulta: ' + error.message);
        res.status(500).send('Error en el servidor');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'usuarios no encontrado' });
      } else {
        res.status(200).json({ message: 'usuarios eliminado con éxito' });
      }
    });
  };