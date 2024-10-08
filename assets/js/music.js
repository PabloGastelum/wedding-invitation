const audio = document.getElementById("miAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const timeDisplay = document.getElementById("timeDisplay");

// Alternar entre Play y Pausa
playPauseBtn.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    audio.play();

    // Cambiar ícono a Pausa
    playPauseBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="#D4B0A5">
        <path d="M6 19h4V5H6zm8-14v14h4V5h-4z"/>
      </svg>`;
  } else {
    audio.pause();

    // Cambiar ícono a Play
    playPauseBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="#D4B0A5">
        <path d="M8 5v14l11-7z"/>
      </svg>`;
  }
});

// Actualizar barra de progreso y tiempo
audio.addEventListener("timeupdate", () => {
  const porcentaje = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${porcentaje}%`;

  // Mostrar el tiempo actual y duración en formato mm:ss
  const minutos = Math.floor(audio.currentTime / 60);
  const segundos = Math.floor(audio.currentTime % 60);
  timeDisplay.textContent = `${minutos}:${
    segundos < 10 ? "0" + segundos : segundos
  }`;
});

// Cambiar el tiempo de reproducción al hacer clic en la barra de progreso
progressContainer.addEventListener("click", (e) => {
  const clickX = e.offsetX;
  const anchoTotal = progressContainer.clientWidth;
  const nuevoTiempo = (clickX / anchoTotal) * audio.duration;
  audio.currentTime = nuevoTiempo;
});
