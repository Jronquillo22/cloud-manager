function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (!u || !p) {
    alert("Completa los campos");
    return;
  }

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

function logout() {
  location.reload();
}