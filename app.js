let role = "usuario";

function setRole(r) {
  role = r;
  document.getElementById("roleSelected").innerText = "Rol: " + r;
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

  // OCULTAR LOGIN
  document.getElementById("loginBox").classList.add("hidden");

  // MOSTRAR APP
  document.getElementById("app").classList.remove("hidden");

  role = found.role;

  if (found.role === "administrador") {
    document.getElementById("adminPanel").classList.remove("hidden");
    loadAdmin(); // IMPORTANTE
  } else {
    document.getElementById("userPanel").classList.remove("hidden");
    loadUserResponses();
  }
}

/* ===== USUARIO ===== */
function guardarCita() {
  let citas = JSON.parse(localStorage.getItem("citas") || "[]");
  citas.push({
    servicio: citaServicio.value,
    fecha: citaFecha.value
  });
  localStorage.setItem("citas", JSON.stringify(citas));
  alert("Cita enviada");
}

function guardarCotizacion() {
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");
  cot.push({
    servicio: cotServicio.value,
    detalle: cotDetalle.value
  });
  localStorage.setItem("cot", JSON.stringify(cot));
  alert("Cotización enviada");
}

/* ===== ADMIN ===== */
function logout() {
  location.reload();
}

function addUser(role) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  users.push({
    user: newUser.value,
    pass: newPass.value,
    role: role
  });

  localStorage.setItem("users", JSON.stringify(users));
  loadAdminData();
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadAdminData();
}



function responderCot(i) {
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  let respuesta = prompt("Respuesta de cotización:");
  cot[i].respuesta = respuesta;

  localStorage.setItem("cot", JSON.stringify(cot));
  loadAdminData();
}

function responderCot(i) {
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  let respuesta = prompt("Respuesta de cotización:");
  cot[i].respuesta = respuesta;

  localStorage.setItem("cot", JSON.stringify(cot));
  loadAdminData();
}

function showView(view) {
  document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
  document.getElementById("userPanel").classList.add("hidden");
  document.getElementById("adminPanel").classList.add("hidden");

  if (role === "administrador") {
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    document.getElementById("userPanel").classList.remove("hidden");
    loadUserResponses();
  }
}
function loadAdmin() {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let citas = JSON.parse(localStorage.getItem("citas") || "[]");
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  userTable.innerHTML = users.map((u,i)=>`
    <tr>
      <td>${u.user}</td>
      <td>${u.role}</td>
      <td><button onclick="deleteUser(${i})">Eliminar</button></td>
    </tr>
  `).join("");

  citaTable.innerHTML = citas.map((c,i)=>`
    <tr>
      <td>${c.servicio}</td>
      <td>${c.fecha}</td>
      <td>${c.estado || "pendiente"}</td>
      <td>
        <button onclick="aceptar(${i})">Aceptar</button>
        <button onclick="rechazar(${i})">Rechazar</button>
      </td>
    </tr>
  `).join("");

  cotTable.innerHTML = cot.map((c,i)=>`
    <tr>
      <td>${c.servicio}</td>
      <td>${c.detalle}</td>
      <td>${c.respuesta || ""}</td>
      <td><button onclick="responder(${i})">Responder</button></td>
    </tr>
  `).join("");
}
function loadUserResponses() {
  let cot = JSON.parse(localStorage.getItem("cot") || "[]");

  userResponses.innerHTML = cot.map(c =>
    `<p>${c.servicio} - Respuesta: ${c.respuesta || "Pendiente"}</p>`
  ).join("");
}