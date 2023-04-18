// Conectarse con Socket.io
var socket = io();

socket.on("connect", function(){
  socket.emit("conexion establecida");
  socket.on("pausa", pausar_video());
});

function pausar_video(){
  var video = document.getElementById("video_player");
  video.pause();
}