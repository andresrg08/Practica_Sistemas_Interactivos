var socket = io();

socket.on("connect", function(){
  socket.emit("conexion establecida");

  var joystick = document.getElementById('esfera');
  var micro = document.getElementById('micro');
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

  /*-----------API Speech---------------*/

  //Con esto permitimos utilizar la api speech
  var SpeechRecognition =
  window.SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList =
  window.SpeechGrammarList || webkitSpeechGrammarList;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  const pelis = { "apocalypse now": 0, 
                  "breaking bad": 1,
                  "gladiator": 2,
                  "good will hunting": 3,
                  "outer banks": 4,
                  "scarface": 5,
                  "the dark knight": 6,
                  "the wolf of wall street": 7,
                  "house of cards": 8,
                  "whiplash": 9,
                  "go back": 10};
  const grammar =
  "#JSGF V1.0; grammar pelis; public <pelis> = " +
  Object.keys(pelis).join(" | ") +
  " ;";

  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;

  micro.addEventListener('click', function() {
    console.log("Pulsar micro");
    recognition.start();
    //btnSpeech.disabled = true;
    console.log("Listo para recibir un comando de película.");

    recognition.onresult = function(event) {
      const result = event.results[0][0].transcript.toLowerCase();
      console.log(`Resultado: ${result}.`);
    
      if (pelis[result] != null) {
        const peliNum = pelis[result];
        console.log(`Película reconocida: ${result}, número ${peliNum}`);
        if (peliNum < 10){
          socket.emit('peli', peliNum);
        }
        else{
          socket.emit('menu_principal', true);
        }
      }

    };

    recognition.onspeechend = function() {
      console.log("speechend");
      recognition.stop();
    };

  });

});
