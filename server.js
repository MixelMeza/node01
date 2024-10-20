const express =require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;
const connection = require('./db');
//Middlware
app.use(cors());
app.use(express.json());

app.get('/api/carreras', (req, res)=>{
    const sql = 'SELECT *FROM carrera';
    connection.query(sql,(err, results)=>{
        if(err){
            console.log('Error en la consulta de Carreras',err);
            return res.status(500).send('Error del servidor');
        }else{
            res.status(200).send(results);
        }
    });
});
app.post('/api/carreras', (req, res) => {
    const { nombre, estado } = req.body;
    const query = 'INSERT INTO carrera (nombre, estado) VALUES (?, ?)';
    
    connection.query(query, [nombre, estado], (err, results) => {
      if (err) {
        console.error('Error al insertar carrera:', err);
        return res.status(500).send('Error en el servidor');
      }
      res.status(201).send({ nombre, estado});
    });
  });

  // Actualizar (PUT)
app.put('/api/carreras/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const query = 'UPDATE carrera SET nombre = ?, estado = ? WHERE idcarrera = ?';
    
    connection.query(query, [nombre, estado, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar carrera:', err);
        return res.status(500).send('Error en el servidor');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('carrera no encontrado');
      }
      res.status(200).send({ id, nombre, estado });
    });
  });
  
  app.delete('/api/carreras/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM carrera WHERE idcarrera = ?';
    
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar Carrera:', err);
        return res.status(500).send('Error en el servidor');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Carrera no encontrada');
      }
      res.status(200).send('Carrera eliminada');
    });
  });
  //Traer Carrera por ID
  app.get('/api/carreras/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT *FROM carrera WHERE idcarrera = ?';
    
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al actualizar carrera:', err);
        return res.status(500).send('Error en el servidor');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('carrera no encontrado');
      }
      res.status(200).send({ results});
    });
  });

app.listen(PORT, ()=>{
    console.log(PORT);
});
