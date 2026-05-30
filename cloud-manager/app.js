let role = "usuario";

/* helpers */
const $ = (id) => document.getElementById(id);

/* LOGIN / REGISTER */

function setRole(r) {
  role = r;
  $("roleSelected").innerText = "Rol seleccionado: " + r;
}

function showRegister() {
  $("loginBox").classList.add("hidden");
  $("registerBox").classList.remove("hidden");
}

function showLogin() {
  $("registerBox").classList.add("hidden");
  $("loginBox").classList.remove("hidden");
}

/* REGISTER */
function register() {
  const regUser = $("regUser");
  const regPass = $("regPass");

  if (!regUser.value || !regPass.value) {
    alert("Completa todos los campos");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  users.push({
    user: regUser.value,
    pass: regPass.value,
    role: role
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuario creado");
  showLogin();
}

/* LOGIN */
function login() {
  const loginUser = $("loginUser");
  const loginPass = $("loginPass");

  if (!loginUser.value || !loginPass.value) {
    alert("Completa los campos");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let found = users.find(u =>
    u.user === loginUser.value &&
    u.pass === loginPass.value
  );

  if (!found) {
    alert("Credenciales incorrectas");
    return;
  }

  role = found.role;

  $("loginBox").classList.add("hidden");
  $("registerBox").classList.add("hidden");
  $("app").classList.remove("hidden");

  showView();
}

/* VIEW */
function showView() {
  $("userPanel").classList.add("hidden");
  $("adminPanel").classList.add("hidden");

  if (role === "administrador") {
    $("adminPanel").classList.remove("hidden");
    loadAdmin();
  } else {
    $("userPanel").classList.remove("hidden");
    loadUser();
  }
}

/* USER */
function guardarCita() {
  const citaServicio = $("citaServicio");
  const citaFecha = $("citaFecha");

  let citas = JSON.parse(localStorage.getItem("citas") || "[]");

  citas.push({
    servicio: citaServicio.value,
    fecha: citaFecha.value,
    estado: "pendiente"
  });

  localStorage.setItem("citas", JSON.stringify(citas));
}

function guardarCotizacion() {
  const cotServicio = $("cotServicio");
  const cotDetalle = $("cotDetalle");

  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  cot.push({
    servicio: cotServicio.value,
    detalle: cotDetalle.value,
    respuesta: ""
  });

  localStorage.setItem("cot", JSON.stringify(cot));
}

/* ADMIN */
function loadAdmin() {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let citas = JSON.parse(localStorage.getItem("citas") || "[]");
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  $("userTable").innerHTML = users.map(u =>
    `<tr><td>${u.user}</td><td>${u.role}</td></tr>`
  ).join("");

  $("citaTable").innerHTML = citas.map(c =>
    `<tr><td>${c.servicio}</td><td>${c.fecha}</td><td>${c.estado}</td></tr>`
  ).join("");

  $("cotTable").innerHTML = cot.map(c =>
    `<tr><td>${c.servicio}</td><td>${c.detalle}</td><td>${c.respuesta}</td></tr>`
  ).join("");
}

/* USER VIEW */
function loadUser() {
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  $("userResponses").innerHTML = cot
    .map(c => `<p>${c.servicio} → ${c.respuesta || "Pendiente"}</p>`)
    .join("");
}

/* LOGOUT */
function logout() {
  location.reload();
}

function init() {
  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("app").classList.add("hidden");
}

window.onload = init;