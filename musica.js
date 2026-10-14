// Música de fondo: en bucle, sin controles (no se puede pausar ni quitar).
// Todas las páginas la usan: <script src="musica.js"></script> (o ../musica.js en las subcarpetas).
// La canción debe llamarse musica/cancion.mp3 (en la carpeta principal).
(function () {
  var script = document.currentScript;
  var carpeta = new URL(".", script.src);
  var audio = new Audio(new URL("musica/Drum Roll (Ending Celebration) - Sound Effect _ ProSounds.mp3", carpeta).href);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.7;

  var KEY_T = "regalo_musica_t";
  var KEY_ON = "regalo_musica_on";

  function leer(k) {
    try { return sessionStorage.getItem(k); } catch (e) { return null; }
  }
  function guardar(k, v) {
    try { sessionStorage.setItem(k, v); } catch (e) {}
  }

  function sonar() {
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  // Si venías de otra página, sigue por donde iba la canción
  var t = parseFloat(leer(KEY_T));
  if (!isNaN(t)) {
    audio.addEventListener("loadedmetadata", function () {
      try { audio.currentTime = audio.duration ? t % audio.duration : t; } catch (e) {}
    }, { once: true });
  }
  if (leer(KEY_ON) === "1") sonar();

  // Los navegadores solo dejan sonar después de un toque: arranca con el primero
  function alToque() {
    guardar(KEY_ON, "1");
    if (audio.paused) sonar();
  }
  ["pointerdown", "keydown"].forEach(function (ev) {
    document.addEventListener(ev, alToque, { passive: true });
  });

  setInterval(function () { guardar(KEY_T, String(audio.currentTime)); }, 500);
  window.addEventListener("pagehide", function () { guardar(KEY_T, String(audio.currentTime)); });
})();
