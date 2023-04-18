var socket = io();

socket.on("connect", function(){
  socket.emit("conexion establecida");

  var pausaBtn = document.getElementById('esfera');
  pausaBtn.addEventListener('click', function() {
    console.log("Tocar esfera");
    socket.emit('pausa', true);
  });
});



