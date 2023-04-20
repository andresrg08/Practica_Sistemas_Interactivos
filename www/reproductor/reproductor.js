// Conectarse con Socket.io
var socket = io();
const movies = document.querySelectorAll('.movie-grid a');
let selectedMovieIndex = 0;
console.log(movies);
var videoPausado= true;


socket.on("connect", function(){
  socket.emit("conexion establecida");
  socket.on("controlar_video", controlarVideo);
  socket.on("derecha", moverDerecha);
  socket.on("izquierda", moverIzquierda);
  socket.on("arriba", moverArriba);
  socket.on("abajo", moverAbajo);
  socket.on("tocar_pelicula", tocarPelicula);
  socket.on("avanzar", avanzar);
  socket.on("retroceder", retroceder);
  socket.on("tocar_micro", tocarMicro);
  

});

/*function pausarVideo(){
  var video = document.getElementById("video_player");
  video.pause();
  console.log("Video pausado");
}

function playVideo(){
  var video = document.getElementById("video_player");
  video.play();
  console.log("Video en play");
}
*/
function controlarVideo(){
  var video = document.getElementById("video_player");
  
  //video.paused=false;
  if (videoPausado) {
    video.play();
    videoPausado = false;
    console.log("Video en play");
  } else {
    video.pause();
    videoPausado = true;
    console.log("Video pausado");
  }
}
// Marca la película seleccionada con la clase "selected"
function selectMovie(index) {
  movies[selectedMovieIndex].classList.remove('selected');
  selectedMovieIndex = index;
  movies[selectedMovieIndex].classList.add('selected');
}

function moverDerecha(){
  if (selectedMovieIndex < movies.length - 1) {
    selectMovie(selectedMovieIndex + 1);
  }
}

function moverIzquierda(){
  if (selectedMovieIndex > 0) {
    selectMovie(selectedMovieIndex - 1);
  }
}

function moverArriba(){
  if (selectedMovieIndex > (movies.length/2) - 1 && selectedMovieIndex <= movies.length - 1 ) {
    selectMovie(selectedMovieIndex - 5);
  }
}

function moverAbajo(){
  if (selectedMovieIndex >= 0 && selectedMovieIndex < (movies.length/2)) {
    selectMovie(selectedMovieIndex + 5);
  }
}

function tocarPelicula(){
  
  var pelicula_seleccionada = movies[selectedMovieIndex];
  if (pelicula_seleccionada != null){
    window.location.href=pelicula_seleccionada.href;
    console.log("Seleccionando pelicula");
  }
}

function avanzar(){
  var video = document.getElementById("video_player");
  var salto = 10; // Saltos de 10 segundos
  video.currentTime += salto;
}

function retroceder(){
  var video = document.getElementById("video_player");
  var salto = 10; // Saltos de 10 segundos
  video.currentTime -= salto;
}

// A PARTIR DE AQUI EMPIEZA LA API DE VOZ
var SpeechRecognition =
  window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList =
  window.SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

const colors = { rojo: "#ff0000", verde: "#00ff00", amarillo: "#ffff00", azul: "#005999", negro: "#000000" };
const grammar =
  "#JSGF V1.0; grammar colors; public <color> = " +
  Object.keys(colors).join(" | ") +
  " ;";

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "es-ES";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const btnSpeech = document.querySelector("#boton_micro");
btnSpeech.addEventListener("click", function(e) {
  recognition.start();
  btnSpeech.disabled = true;
  console.log("Listo para recibir un comando de color.");
});

recognition.onresult = function(event) {
  console.log("result");
  console.log(event);
  const result = event.results[0][0].transcript;
  console.log(`Resultado: ${result}.`);
  console.log(`Confianza: ${event.results[0][0].confidence}`);

  if (colors[result]) {
    document.body.style.backgroundColor = colors[result];
  }
};

recognition.onspeechend = function() {
  console.log("speechend");
  recognition.stop();
  //btnSpeech.disabled = false;

};

/* Para habilitar reconocimiento continuo */

recognition.onend = function() {
  console.log("end");
  recognition.start();
}

recognition.onnomatch = function(event) {
  document.body.style.backgroundColor = "#000000";
  console.log("No he reconocido el color");
  recognition.stop();
  btnSpeech.disabled = false;
};

recognition.onerror = function(event) {
  console.log(`Error occurred in recognition: ${event.error}`);
};


