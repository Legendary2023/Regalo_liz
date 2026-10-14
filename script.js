const $ = (id) => document.getElementById(id);

var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

const regalo = $("regalo");
const titulo = $("titulo");
const pista = $("pista");
const opciones = $("opciones");
const atras = $("atras");
const contFlores = $("flores");
const contEstrellas = $("estrellas");
const lista = document.querySelector(".opciones");
const botones = document.querySelectorAll(".opcion");

let abierto = false;
let navegando = false;

// =====================================================
//  FLORES: rosas y gardenias que caen lento, una por una
// =====================================================
const ROSA =
  '<svg viewBox="0 0 100 100" aria-hidden="true">' +
  '<g stroke="#7a0c3a" stroke-opacity=".35" stroke-width=".8">' +
  '<g fill="url(#gRosaA)">' +
  [0, 72, 144, 216, 288].map((a) => '<ellipse cx="50" cy="26" rx="20" ry="24" transform="rotate(' + a + ' 50 50)"/>').join("") +
  "</g>" +
  '<g fill="url(#gRosaB)">' +
  [36, 108, 180, 252, 324].map((a) => '<ellipse cx="50" cy="32" rx="16" ry="19" transform="rotate(' + a + ' 50 50)"/>').join("") +
  "</g>" +
  '<g fill="url(#gRosaC)">' +
  [0, 90, 180, 270].map((a) => '<ellipse cx="50" cy="39" rx="11" ry="13" transform="rotate(' + a + ' 50 50)"/>').join("") +
  "</g></g>" +
  '<path d="M50 50 c0-4 5-4 5 0 s-2 7-8 6 s-9-8-5-13 s12-6 16 0" fill="none" stroke="#7a0c3a" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>' +
  "</svg>";

const GARDENIA =
  '<svg viewBox="0 0 100 100" aria-hidden="true">' +
  '<path d="M50 52 C22 50 6 72 18 92 C38 96 50 78 50 52Z" fill="#4f8a5b"/>' +
  '<path d="M50 52 C78 50 94 72 82 92 C62 96 50 78 50 52Z" fill="#3f7a4d"/>' +
  '<g stroke="#cdbfd6" stroke-width=".8" stroke-opacity=".8">' +
  '<g fill="url(#gGard)">' +
  [0, 60, 120, 180, 240, 300].map((a) => '<path d="M50 50 C28 42 24 14 50 8 C76 14 72 42 50 50Z" transform="rotate(' + a + ' 50 50)"/>').join("") +
  "</g>" +
  '<g fill="url(#gGard)">' +
  [30, 90, 150, 210, 270, 330].map((a) => '<path d="M50 50 C34 44 32 24 50 19 C68 24 66 44 50 50Z" transform="rotate(' + a + ' 50 50)"/>').join("") +
  "</g></g>" +
  '<circle cx="50" cy="50" r="6" fill="#f2e7cf"/>' +
  '<path d="M50 50 c0-3 4-3 4 0 s-2 5-6 4" fill="none" stroke="#c9b48a" stroke-width="1.2" stroke-linecap="round"/>' +
  "</svg>";

function soltarFlor(retraso) {
  if (contFlores.children.length >= 16) return;
  const f = document.createElement("div");
  f.className = "flor";
  f.innerHTML = Math.random() < 0.5 ? ROSA : GARDENIA;
  f.style.setProperty("--x", Math.random() * 92 + "vw");
  f.style.setProperty("--s", 34 + Math.random() * 40 + "px");
  f.style.setProperty("--d", 20 + Math.random() * 12 + "s");           // caída lenta
  f.style.setProperty("--sway", 30 + Math.random() * 60 + "px");
  f.style.setProperty("--giro", (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 180) + "deg");
  if (retraso) f.style.setProperty("--delay", retraso + "s");
  f.addEventListener("animationend", (e) => {
    if (e.target === f) f.remove();
  });
  contFlores.appendChild(f);
}

// Las primeras ya van a media caída para que la pantalla no empiece vacía
[-3, -8, -13, -18, -23].forEach((r) => soltarFlor(r));
// Después cae una nueva cada cierto tiempo
setInterval(() => soltarFlor(0), 2600);

// ---------- Estrellitas del fondo ----------
for (let i = 0; i < 38; i++) {
  const e = document.createElement("span");
  e.className = "estrella";
  e.textContent = i % 3 === 0 ? "✦" : "✧";
  e.style.setProperty("--x", Math.random() * 100 + "vw");
  e.style.setProperty("--y", Math.random() * 100 + "vh");
  e.style.setProperty("--s", 8 + Math.random() * 14 + "px");
  e.style.setProperty("--d", 2.5 + Math.random() * 3.5 + "s");
  e.style.setProperty("--delay", -Math.random() * 6 + "s");
  contEstrellas.appendChild(e);
}

// =====================================================
//  CONFETI de corazones y pétalos
// =====================================================
function estallido(x, y, cantidad) {
  const simbolos = ["♥", "✿", "❀", "✦", "❁"];
  const colores = ["#ff6f9f", "#ffd36e", "#ffffff", "#d5a6ff", "#ff9a8b"];
  for (let i = 0; i < cantidad; i++) {
    const s = document.createElement("span");
    s.className = "chispazo";
    s.textContent = simbolos[i % simbolos.length];
    const ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
    const dist = 70 + Math.random() * 170;
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.color = colores[i % colores.length];
    s.style.fontSize = 14 + Math.random() * 18 + "px";
    s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
    s.style.setProperty("--dy", Math.sin(ang) * dist + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1800);
  }
}

// =====================================================
//  ABRIR / CERRAR EL REGALO
// =====================================================
function abrir() {
  if (abierto) return;
  abierto = true;
  regalo.classList.add("abierto");
  titulo.classList.add("oculto");
  pista.classList.add("oculta");

  const r = regalo.getBoundingClientRect();
  estallido(r.left + r.width / 2, r.top + r.height * 0.55, 34);

  setTimeout(() => {
    if (!abierto) return;
    opciones.classList.add("activa");
    opciones.setAttribute("aria-hidden", "false");
    const primera = lista.querySelector(".opcion");
    if (primera) primera.focus({ preventScroll: true });
  }, 1150);
}

function volver() {
  if (!opciones.classList.contains("activa") || navegando) return;
  opciones.classList.add("saliendo");
  setTimeout(() => {
    reiniciar();
    regalo.focus({ preventScroll: true });
  }, 520);
}

function reiniciar() {
  abierto = false;
  navegando = false;
  opciones.classList.remove("activa", "saliendo");
  opciones.setAttribute("aria-hidden", "true");
  regalo.classList.remove("abierto");
  titulo.classList.remove("oculto");
  pista.classList.remove("oculta");
  lista.classList.remove("eligiendo");
  botones.forEach((b) => b.classList.remove("pulsada"));
}

regalo.addEventListener("click", abrir);
regalo.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    abrir();
  }
});
atras.addEventListener("click", volver);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") volver();
});

// Si vuelves con el botón "atrás" del navegador, empieza otra vez limpio
window.addEventListener("pageshow", (e) => {
  if (e.persisted) reiniciar();
});

// =====================================================
//  BOTONES: Carta, Libro, Ramo
// =====================================================
botones.forEach((b) => {
  b.addEventListener("click", (e) => {
    e.preventDefault();
    if (navegando) return;
    navegando = true;

    b.classList.add("pulsada");
    lista.classList.add("eligiendo");

    // onda de luz
    const r = b.getBoundingClientRect();
    const teclado = !e.clientX && !e.clientY;
    const x = teclado ? r.width / 2 : e.clientX - r.left;
    const y = teclado ? r.height / 2 : e.clientY - r.top;
    const d = Math.max(r.width, r.height) * 2;
    const rip = document.createElement("span");
    rip.className = "ripple";
    rip.style.width = rip.style.height = d + "px";
    rip.style.left = x - d / 2 + "px";
    rip.style.top = y - d / 2 + "px";
    b.appendChild(rip);

    // corazones
    estallido(r.left + r.width / 2, r.top + r.height / 2, 14);

    // va a la otra página (otra carpeta) cuando termina la animación
    setTimeout(() => {
      window.location.href = b.getAttribute("href");
    }, 850);
  });
});
