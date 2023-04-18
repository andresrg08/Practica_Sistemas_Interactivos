var socket = io();

socket.on("connect", function(){
  socket.emit("conexion establecida");
  
  var pausaBtn = document.getElementById('esfera');
  pausaBtn.addEventListener('ontouch', function() {
    console.log("Tocar esfera");
    socket.emit('pausa', true);
  });
});



