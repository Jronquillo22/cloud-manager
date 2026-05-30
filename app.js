let selectedRole = "user";

function showRegister() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

function setRole(role) {
  selectedRole = role;
  document.getElementById("roleSelected").innerText = "Rol: " + role;
}

function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  users.push({ user, pass, role: selectedRole });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuario registrado");
  showLogin();
}

function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let found = users.find(u => u.user === user && u.pass === pass);

  if (!found) {
    alert("Credenciales incorrectas");
    return;
  }

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  if (found.role === "admin") {
    document.getElementById("adminPanel").classList.remove("hidden");

    loadUsers();
  } else {
    document.getElementById("userPanel").classList.remove("hidden");
  }
}

function loadUsers() {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let list = document.getElementById("userList");

  list.innerHTML = "";

  users.forEach(u => {
    let li = document.createElement("li");
    li.innerText = `${u.user} - ${u.role}`;
    list.appendChild(li);
  });
}

function logout() {
  location.reload();
}