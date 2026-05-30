let role = "usuario";

/* ===== LOGIN / REGISTER ===== */

function setRole(r) {
  role = r;
}

function showRegister() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

function register() {
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

function login() {
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let found = users.find(u =>
    u.user === loginUser.value &&
    u.pass === loginPass.value
  );

  if (!found) {
    alert("Credenciales incorrectas");
    return;
  }

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  role = found.role;

  if (role === "administrador") {
    document.getElementById("adminPanel").classList.remove("hidden");
    loadAdmin();
  } else {
    document.getElementById("userPanel").classList.remove("hidden");
    loadUserResponses();
  }
}

/* ===== USER ===== */

function guardarCita() {
  let citas = JSON.parse(localStorage.getItem("citas") || "[]");

  citas.push({
    servicio: citaServicio.value,
    fecha: citaFecha.value,
    estado: "pendiente"
  });

  localStorage.setItem("citas", JSON.stringify(citas));
  alert("Cita enviada");
}

function guardarCotizacion() {
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  cot.push({
    servicio: cotServicio.value,
    detalle: cotDetalle.value,
    respuesta: ""
  });

  localStorage.setItem("cot", JSON.stringify(cot));
  alert("Cotización enviada");
}

/* ===== ADMIN ===== */

function loadAdmin() {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let citas = JSON.parse(localStorage.getItem("citas") || "[]");
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  userTable.innerHTML = users.map((u, i) =>
    `<tr>
      <td>${u.user}</td>
      <td>${u.role}</td>
      <td><button onclick="deleteUser(${i})">Eliminar</button></td>
    </tr>`
  ).join("");

  citaTable.innerHTML = citas.map((c, i) =>
    `<tr>
      <td>${c.servicio}</td>
      <td>${c.fecha}</td>
      <td>${c.estado}</td>
      <td>
        <button onclick="aceptar(${i})">Aceptar</button>
        <button onclick="rechazar(${i})">Rechazar</button>
      </td>
    </tr>`
  ).join("");

  cotTable.innerHTML = cot.map((c, i) =>
    `<tr>
      <td>${c.servicio}</td>
      <td>${c.detalle}</td>
      <td>${c.respuesta}</td>
      <td><button onclick="responder(${i})">Responder</button></td>
    </tr>`
  ).join("");
}

/* ===== ACCIONES ADMIN ===== */

function deleteUser(i) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users.splice(i, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadAdmin();
}

function aceptar(i) {
  let citas = JSON.parse(localStorage.getItem("citas") || "[]");
  citas[i].estado = "aceptada";
  localStorage.setItem("citas", JSON.stringify(citas));
  loadAdmin();
}

function rechazar(i) {
  let citas = JSON.parse(localStorage.getItem("citas") || "[]");
  citas[i].estado = "rechazada";
  localStorage.setItem("citas", JSON.stringify(citas));
  loadAdmin();
}

function responder(i) {
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  cot[i].respuesta = prompt("Respuesta:");
  localStorage.setItem("cot", JSON.stringify(cot));

  loadAdmin();
}

/* ===== USER RESPONSES ===== */

function loadUserResponses() {
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  userResponses.innerHTML = cot.map(c =>
    `<p>${c.servicio} → ${c.respuesta || "Pendiente"}</p>`
  ).join("");
}

/* ===== NAV ===== */

function showView(v) {
  document.getElementById("userPanel").classList.add("hidden");
  document.getElementById("adminPanel").classList.add("hidden");

  if (role === "administrador") {
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    document.getElementById("userPanel").classList.remove("hidden");
    loadUserResponses();
  }
}

function logout() {
  location.reload();
}