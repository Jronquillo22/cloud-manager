/* =========================
   VISTAS
========================= */

function showLogin() {
  document.getElementById("loginView").classList.remove("hidden");
  document.getElementById("registerView").classList.add("hidden");
  document.getElementById("appView").classList.add("hidden");
}

function showRegister() {
  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("registerView").classList.remove("hidden");
  document.getElementById("appView").classList.add("hidden");
}

function showApp(user) {
  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("registerView").classList.add("hidden");
  document.getElementById("appView").classList.remove("hidden");

  document.getElementById("welcome").innerText =
    "Bienvenido " + user.user + " (" + user.role + ")";
}

/* =========================
   REGISTRO
========================= */

function register() {

  const user = document.getElementById("regUser").value;
  const pass = document.getElementById("regPass").value;
  const role = document.getElementById("regRole").value;

  if (!user || !pass) {
    alert("Completa todos los campos");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.some(u => u.user === user);

  if (exists) {
    alert("El usuario ya existe");
    return;
  }

  users.push({ user, pass, role });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuario creado");

  showLogin();
}

/* =========================
   LOGIN
========================= */

function login() {

  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let found = users.find(u => u.user === user && u.pass === pass);

  if (!found) {
    alert("Credenciales incorrectas");
    return;
  }

  showApp(found);
}

/* =========================
   LOGOUT
========================= */

function logout() {
  showLogin();
}

/* =========================
   INICIO AUTOMÁTICO
========================= */

window.onload = showLogin;