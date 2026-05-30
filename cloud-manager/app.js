let role = "usuario";

/* LOGIN / REGISTER */
function setRole(r){
  role = r;
  document.getElementById("roleSelected").innerText = "Rol: " + r;
}

function showRegister(){
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin(){
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

/* REGISTER */
function register(){

  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  if(!user || !pass){
    alert("Completa todos los campos");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")||"[]");

  users.push({ user, pass, role });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuario creado");

  showLogin();
}

/* LOGIN */
function login(){

  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  if(!user || !pass){
    alert("Completa los campos");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")||"[]");

  let found = users.find(u => u.user === user && u.pass === pass);

  if(!found){
    alert("Credenciales incorrectas");
    return;
  }

  role = found.role;

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  showPanel("user");
}

/* PANELS */
function showPanel(p){

  userPanel.classList.add("hidden");
  adminPanel.classList.add("hidden");
  monitorPanel.classList.add("hidden");

  if(p==="user") userPanel.classList.remove("hidden");
  if(p==="admin") adminPanel.classList.remove("hidden");
  if(p==="monitor") monitorPanel.classList.remove("hidden"), drawChart();
}

/* CITA */
function guardarCita(){

  let citas = JSON.parse(localStorage.getItem("citas")||"[]");

  citas.push({
    nombre:citaNombre.value,
    email:citaEmail.value,
    telefono:citaTelefono.value,
    servicio:citaServicio.value,
    fecha:citaFecha.value,
    estado:"pendiente"
  });

  localStorage.setItem("citas",JSON.stringify(citas));

  loadAdmin();
}

/* COT */
function guardarCotizacion(){

  let cot = JSON.parse(localStorage.getItem("cot")||"[]");

  cot.push({
    servicio:cotServicio.value,
    detalle:cotDetalle.value,
    respuesta:""
  });

  localStorage.setItem("cot",JSON.stringify(cot));

  loadAdmin();
}

/* ADMIN */
function loadAdmin(){

  let citas = JSON.parse(localStorage.getItem("citas")||"[]");
  let cot = JSON.parse(localStorage.getItem("cot")||"[]");

  citaTable.innerHTML = citas.map((c,i)=>
  `<tr>
    <td>${c.nombre}</td>
    <td>${c.servicio}</td>
    <td>${c.estado}</td>
    <td>
      <button onclick="cambiarEstado(${i},'aceptada')">Aceptar</button>
      <button onclick="cambiarEstado(${i},'rechazada')">Rechazar</button>
      <button onclick="cambiarEstado(${i},'reagendada')">Reagendar</button>
    </td>
  </tr>`).join("");

  cotTable.innerHTML = cot.map((c,i)=>
  `<tr>
    <td>${c.servicio}</td>
    <td>${c.detalle}</td>
    <td>${c.respuesta}</td>
    <td><button onclick="responder(${i})">Responder</button></td>
  </tr>`).join("");
}

function cambiarEstado(i,estado){
  let citas = JSON.parse(localStorage.getItem("citas"));
  citas[i].estado = estado;
  localStorage.setItem("citas",JSON.stringify(citas));
  loadAdmin();
}

function responder(i){
  let cot = JSON.parse(localStorage.getItem("cot"));
  cot[i].respuesta = prompt("Respuesta:");
  localStorage.setItem("cot",JSON.stringify(cot));
  loadAdmin();
}

/* MONITOR */
function drawChart(){

  let ctx = document.getElementById("chart").getContext("2d");

  let data = JSON.parse(localStorage.getItem("citas")||"[]");

  ctx.clearRect(0,0,400,200);

  ctx.fillStyle="green";

  ctx.fillText("Actividad: " + data.length, 20, 50);
}

/* LOGOUT */
function logout(){
  location.reload();
}