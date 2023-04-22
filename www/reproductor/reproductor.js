// Conectarse con Socket.io
var socket = io();
const movies = document.querySelectorAll('.movie-grid a');
let selectedMovieIndex = 0;
console.log(movies);
var videoPausado = false;


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
  socket.on('menu_principal', menuPrincipal);

  
  socket.on("pantalla_completa", function(){
    var video = document.getElementById("video_player");
    if (document.fullscreenElement === video) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  });

  socket.on('peli', function(peliNum){
    console.log('El servidor envió el número de película:', peliNum);
    selectMovie(peliNum);
    tocarPelicula();
  });
  
socket.on("subir_volumen", function(volume){
  console.log('Subiendo volumen a:', volume);
  const video = document.getElementById('video_player');
  if (video.volume >= 0 && video.volume < 1) {
    video.volume += volume;
    if (video.volume > 1) {
      video.volume = 1;
    }
  }
});

  socket.on("bajar_volumen", function(volume){
    console.log('Bajando volumen a:', volume);
    const video = document.getElementById('video_player');
    if (video.volume > 0 && video.volume<=1){
      video.volume -= volume
      if (video.volume < 0) {
        video.volume = 0;
      }
    }
  });
});

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
  console.log("Avanzado");
}

function retroceder(){
  var video = document.getElementById("video_player");
  var salto = 10; // Saltos de 10 segundos
  video.currentTime -= salto;
}

function menuPrincipal(){
  window.location.href = "./index.html";
}



