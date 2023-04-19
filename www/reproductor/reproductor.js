// Conectarse con Socket.io
var socket = io();
const movies = document.querySelectorAll('.movie-grid a');
let selectedMovieIndex = 0;

socket.on("connect", function(){
  socket.emit("conexion establecida");
  socket.on("pausa", pausar_video);
  socket.on("derecha", mover_derecha);
});

function pausar_video(){
  var video = document.getElementById("video_player");
  video.pause();
  console.log("Video pausado")
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

