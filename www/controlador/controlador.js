// Obtener una referencia al botón de pausa
var pausaBtn = document.getElementById('esfera');

// Conectarse con Socket.io
var socket = io();

// Agregar un evento de clic al botón de pausa
pausaBtn.addEventListener('click', function() {
  console.log("esfera");
  // Enviar un mensaje al servidor indicando que se ha hecho clic en el botón de pausa
  socket.emit('pausa', true);
});
