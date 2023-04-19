var socket = io();

socket.on("connect", function(){
  socket.emit("conexion establecida");

  var joystick = document.getElementById('esfera');
  var initialX, initialY;
  var currentX = -200, currentY = -200;

  // Eventos táctiles para dispositivos móviles
  joystick.addEventListener('touchstart', function(event) {
    initialX = event.touches[0].clientX - currentX;
    initialY = event.touches[0].clientY - currentY;
  });

  joystick.addEventListener('touchmove', function(event) {
    event.preventDefault();
    currentX = event.touches[0].clientX - initialX;
    currentY = event.touches[0].clientY - initialY;
    console.log(currentX)
   
    joystick.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
  });

  joystick.addEventListener('touchend', function() {
    console.log("Mover esfera");
    socket.emit('mover_esfera', {x: currentX, y: currentY});
    currentX = -200;
    currentY = -200;
    joystick.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
  });

  // Evento de clic para navegadores de escritorio
  joystick.addEventListener('click', function() {
    console.log("Tocar esfera");
    socket.emit('pausa', true);
  });

  
});
