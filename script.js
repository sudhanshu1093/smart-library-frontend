const users = [
  { username: "student1", password: "1234", role: "student" },
  { username: "librarian1", password: "admin", role: "librarian" }
];

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const error = document.getElementById("error");

  if (role === "") {
    error.innerText = "Please select role!";
    return;
  }

  const user = users.find(function(u) {
    return u.username === username &&
           u.password === password &&
           u.role === role;
  });

  if (user) {
    if (role === "student") {
      window.location.href = "student.html";
    } else {
      window.location.href = "librarian.html";
    }
  } else {
    error.innerText = "Invalid Credentials!";
  }
}

function goToRegister() {
  window.location.href = "register.html";
}