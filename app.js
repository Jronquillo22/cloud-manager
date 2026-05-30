function showRegister() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;
  let role = document.getElementById("regRole").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  users.push({ user, pass, role });

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
  } else {
    document.getElementById("userPanel").classList.remove("hidden");
  }
}

function logout() {
  location.reload();
}