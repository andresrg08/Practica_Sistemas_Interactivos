// Conectarse con Socket.io
var socket = io();
const movies = document.querySelectorAll('.movie-grid a');
let selectedMovieIndex = 0;
console.log(movies);

socket.on("connect", function(){
  socket.emit("conexion establecida");
  socket.on("pausa", pausarVideo);
  socket.on("derecha", moverDerecha);
  socket.on("izquierda", moverIzquierda);
  socket.on("arriba", moverArriba);
  socket.on("abajo", moverAbajo);
});

function pausarVideo(){
  var video = document.getElementById("video_player");
  video.pause();
  console.log("Video pausado");
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



