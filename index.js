const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const clients = [];
// Indicar la carpeta de archivos estáticos (en este caso, la carpeta www)
app.use(express.static('www'));

// Manejar la conexión de los clientes
io.on('connection', (socket) => {

  // Recibir el mensaje de pausa del controlador
  socket.on('pausa', (data) => {
    // Enviar el mensaje de pausa al video correspondiente
    socket.broadcast.emit('pausa', data);
  });

});

// Iniciar el servidor en el puerto 3000
http.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
