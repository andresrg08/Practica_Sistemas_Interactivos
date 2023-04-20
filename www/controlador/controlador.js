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
    joystick.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
  });

  joystick.addEventListener('touchend', function() {
    if (currentX > 229 && currentY > -380 && currentY < 230){
      console.log("derecha");
      socket.emit('derecha', true);
      socket.emit('avanzar', true);
    }

    if (currentX < -385 && currentY > -380 && currentY < 230){
      console.log("izquierda");
      socket.emit('izquierda', true);
      socket.emit('retroceder', true);
    }

    if (currentY < -380 && currentX < 229 && currentX > -385){
      console.log("arriba");
      socket.emit('arriba', true);
    }

    if (currentY > 230 && currentX < 229 && currentX > -385){
      console.log("abajo");
      socket.emit('abajo', true);
    }


    console.log("Mover esfera");
    currentX = -150;
    currentY = -150;
    joystick.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
  });

  // Evento de clic para navegadores de escritorio
  joystick.addEventListener('click', function() {
    console.log("Tocar esfera");
    socket.emit('controlar_video', true);
  });

  joystick.addEventListener('click', function() {
    console.log("Tocar pelicula");
    socket.emit('tocar_pelicula', true);
  });
 
  

});
