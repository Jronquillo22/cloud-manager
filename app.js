let role = "usuario";

function setRole(r){
  role = r;
  roleSelected.innerText = "Rol: " + r;
}

/* LOGIN */
function login(){
  let users = JSON.parse(localStorage.getItem("users")||"[]");

  let found = users.find(u =>
    u.user === loginUser.value &&
    u.pass === loginPass.value
  );

  if(!found){ alert("Error"); return; }

  role = found.role;

  loginBox.classList.add("hidden");
  app.classList.remove("hidden");

  showPanel("user");

  registerActivity();
}

/* REGISTER */
function register(){

  if(!regUser.value || !regPass.value){
    alert("Campos vacíos");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")||"[]");

  users.push({
    user: regUser.value,
    pass: regPass.value,
    role
  });

  localStorage.setItem("users",JSON.stringify(users));

  showLogin();
}

/* PANELS */
function showPanel(p){

  userPanel.classList.add("hidden");
  adminPanel.classList.add("hidden");
  monitorPanel.classList.add("hidden");

  if(p==="user") userPanel.classList.remove("hidden");
  if(p==="admin") loadAdmin(), adminPanel.classList.remove("hidden");
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

  registerActivity();
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

  registerActivity();
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
      <button onclick="aceptar(${i})">Aceptar</button>
      <button onclick="rechazar(${i})">Rechazar</button>
      <button onclick="reagendar(${i})">Reagendar</button>
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

/* ACTIONS */
function aceptar(i){
  let c = JSON.parse(localStorage.getItem("citas"));
  c[i].estado="aceptada";
  localStorage.setItem("citas",JSON.stringify(c));
  loadAdmin();
}

function rechazar(i){
  let c = JSON.parse(localStorage.getItem("citas"));
  c[i].estado="rechazada";
  localStorage.setItem("citas",JSON.stringify(c));
  loadAdmin();
}

function reagendar(i){
  let c = JSON.parse(localStorage.getItem("citas"));
  c[i].estado="reagendada";
  localStorage.setItem("citas",JSON.stringify(c));
  loadAdmin();
}

function responder(i){
  let c = JSON.parse(localStorage.getItem("cot"));
  c[i].respuesta = prompt("Respuesta:");
  localStorage.setItem("cot",JSON.stringify(c));
  loadAdmin();
}

/* MONITOR */
function registerActivity(){
  let data = JSON.parse(localStorage.getItem("activity")||"[0,0,0]");
  data[0]++;
  localStorage.setItem("activity",JSON.stringify(data));
}

function drawChart(){
  let ctx = document.getElementById("chart").getContext("2d");

  let data = JSON.parse(localStorage.getItem("activity")||"[10,5,8]");

  ctx.clearRect(0,0,400,300);
  ctx.fillStyle="green";

  data.forEach((v,i)=>{
    ctx.fillRect(i*60,150-v*5,40,v*5);
  });
}

/* LOGOUT */
function logout(){
  location.reload();
}