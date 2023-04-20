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



