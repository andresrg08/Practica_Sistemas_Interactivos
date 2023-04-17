// Conectar al servidor de socket.io
var socket = io();

// Escuchar el evento "pausa" enviado desde el servidor
socket.on('pausa', function() {
  // Obtener el elemento de video
  var video = document.getElementById('video_player');

  // Pausar el video
  video.pause();
});