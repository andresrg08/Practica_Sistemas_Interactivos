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
  // Recibir el mensaje de pausa del controlador
  socket.on('pausa', (data) => {
    // Enviar el mensaje de pausa al video correspondiente
    io.emit('pausa', data);
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

});

// Iniciar el servidor en el puerto 3000
http.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});

