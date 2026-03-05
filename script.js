const BASE_URL = "https://smart-library-backend-3762.onrender.com";

// ✅ Already logged-in? then direct dashboard
(function autoRedirectIfLoggedIn() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token && role) {
    window.location.href = role === "student" ? "student.html" : "librarian.html";
  }
})();

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const error = document.getElementById("error");

  error.innerText = "";

  if (role === "") {
    error.innerText = "Please select role!";
    return;
  }
  if (!username || !password) {
    error.innerText = "Please fill all fields!";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, username, password })
    });

    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch {}

    if (res.ok && data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      window.location.href = role === "student" ? "student.html" : "librarian.html";
    } else {
      error.innerText = data.message || "Invalid Credentials!";
    }
  } catch (e) {
    error.innerText = "Server error! Backend not responding.";
  }
}

function goToRegister() {
  window.location.href = "register.html";
}

// Optional logout helper (use in student/librarian pages if you want)
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}