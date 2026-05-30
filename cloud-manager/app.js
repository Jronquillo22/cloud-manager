let role = "usuario";

/* LOGIN / REGISTER */
function setRole(r){
  role = r;
  roleSelected.innerText = "Rol: " + r;
}

function showRegister(){
  loginBox.classList.add("hidden");
  registerBox.classList.remove("hidden");
}

function showLogin(){
  registerBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

/* REGISTER */
function register(){

  let user = regUser.value;
  let pass = regPass.value;

  if(!user || !pass){
    alert("Completa los campos");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")||"[]");

  users.push({user, pass, role});

  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuario creado");

  showLogin();
}

/* LOGIN */
function login(){

  let user = loginUser.value;
  let pass = loginPass.value;

  if(!user || !pass){
    alert("Completa campos");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")||"[]");

  let found = users.find(u => u.user === user && u.pass === pass);

  if(!found){
    alert("Error login");
    return;
  }

  role = found.role;

  loginBox.classList.add("hidden");
  registerBox.classList.add("hidden");
  app.classList.remove("hidden");

  showPanel("user");
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

/* USER */
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
}

function guardarCotizacion(){

  let cot = JSON.parse(localStorage.getItem("cot")||"[]");

  cot.push({
    servicio:cotServicio.value,
    detalle:cotDetalle.value,
    respuesta:""
  });

  localStorage.setItem("cot",JSON.stringify(cot));
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
      <button onclick="estado(${i},'aceptada')">✔</button>
      <button onclick="estado(${i},'rechazada')">✖</button>
      <button onclick="estado(${i},'reagendada')">🔁</button>
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

function estado(i,est){
  let citas = JSON.parse(localStorage.getItem("citas"));
  citas[i].estado = est;
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
  let citas = JSON.parse(localStorage.getItem("citas")||"[]");

  ctx.clearRect(0,0,400,200);
  ctx.fillStyle="green";
  ctx.fillText("Citas: " + citas.length, 20, 50);
}

/* LOGOUT */
function logout(){
  location.reload();
}