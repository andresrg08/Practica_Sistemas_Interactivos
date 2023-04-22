var socket = io();

socket.on("connect", function(){
  socket.emit("conexion establecida");

  var joystick = document.getElementById('esfera');
  var micro = document.getElementById('micro');
  var initialX, initialY;
  var currentX = -200, currentY = -200;
  var logo = document.getElementById('div_logo');
  

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
    if (currentX > 150){
      console.log("derecha");
      socket.emit('derecha', true);
      socket.emit('avanzar', true);
    }

    if (currentX < -365 && currentY > -380 && currentY < 230){
      console.log("izquierda");
      socket.emit('izquierda', true);
      socket.emit('retroceder', true);
    }

    if (currentY < -380 && currentX < 150 && currentX > -365){
      console.log("arriba");
      socket.emit('arriba', true);
      socket.emit('pantalla_completa', true);
      console.log("pantalla completa");
    }

    if (currentY > 230 && currentX < 150 && currentX > -365){
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

  logo.addEventListener('click', function(){
    console.log("Tocando logo");
    socket.emit('menu_principal', true);
  })

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
                  "go back": 10,
                  "random": 11};
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
    micro.style.backgroundColor = "#ff6060";
    micro.style.borderColor= "red";
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
        else if(peliNum == 10){
          socket.emit('menu_principal', true);
        }
        else{
          let peliRandom = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
          socket.emit('peli', peliRandom);
        }
      }

    };

    recognition.onspeechend = function() {
      micro.style.backgroundColor = "#b4d6e6";
      micro.style.borderColor= "rgb(49, 129, 175)";
      console.log("speechend");
      recognition.stop();
    };

  });

});

/*-----------------------------------------------------*/

var vol_encendido = false;
var volumen_control = 0.01;
var volumen = document.getElementById('activacion_volumen');

volumen.addEventListener('touchstart', function() {
  console.log("Preparado para controlar volumen");
  volumen.style.backgroundColor = "#ff6060";
  volumen.style.borderColor= "red";
  vol_encendido = true;
});

volumen.addEventListener('touchend', function() {
  volumen.style.backgroundColor = "#b4d6e6";
  volumen.style.borderColor= "rgb(49, 129, 175)";
  console.log("Parando control de volumen")
  vol_encendido = false;
});

window.addEventListener('deviceorientation', function(event) {
  if (vol_encendido) {
    const angle = event.gamma;
    if (angle > 30) {
      // Giro hacia la derecha, subir volumen
      console.log("subir");
      socket.emit("subir_volumen", volumen_control);
    }
    if (angle < -30) {
      // Giro hacia la derecha, subir volumen
      console.log("bajar");
      socket.emit("bajar_volumen", volumen_control);
    }

  }
});


