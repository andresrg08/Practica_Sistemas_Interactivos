function mostrarVideo(idVideo) {
    // Ocultar todos los videos
    var videos = document.getElementsByClassName('video');
    for (var i = 0; i < videos.length; i++) {
      videos[i].style.display = 'none';
    }
    // Mostrar el video correspondiente
    var videoMostrado = document.getElementById(idVideo);
    videoMostrado.style.display = 'block';
  }