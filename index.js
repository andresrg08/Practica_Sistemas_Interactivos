const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const clients = [];


app.use('/', express.static(path.join(__dirname, 'www')));


// Manejar la conexión de los clientes
io.on('connection', (socket) => {
  console.log(`Cliente ${socket.id} conectado`);
  
  // Recibir el mensaje de reproducir del controlador
  
  socket.on('controlar_video', (data) => {
    // Enviar el mensaje de pausa al video correspondiente
    io.emit('controlar_video', data);
  });

  socket.on('derecha', (data) => {
    // Enviar el mensaje para navegar a la derecha
    io.emit('derecha', data);
  });

  socket.on('izquierda', (data) => {
    // Enviar el mensaje para navegar a la izquierda
    io.emit('izquierda', data);
  });

  socket.on('arriba', (data) => {
    // Enviar el mensaje para navegar a la izquierda
    io.emit('arriba', data);
  });

  socket.on('abajo', (data) => {
    // Enviar el mensaje para navegar a la izquierda
    io.emit('abajo', data);
  });

  socket.on('tocar_pelicula', (data) => {
    // Enviar el mensaje para navegar a la izquierda
    io.emit('tocar_pelicula', data);
  });

  socket.on('avanzar', (data) => {
    // Enviar el mensaje para navegar a la izquierda
    io.emit('avanzar', data);
  });

  socket.on('retroceder', (data) => {
    // Enviar el mensaje para navegar a la izquierda
    io.emit('retroceder', data);
  });

  socket.on('tocar_micro', (data) => {
    // Enviar el mensaje para navegar a la izquierda
    io.emit('tocar_micro', data);
  });


});

// Iniciar el servidor en el puerto 3000
http.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});

