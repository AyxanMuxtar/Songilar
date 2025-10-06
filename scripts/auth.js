// Authentication management - Pure JavaScript (no modules)

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("currentUser") !== null
}

// Get current user
function getCurrentUser() {
  const userStr = localStorage.getItem("currentUser")
  return userStr ? JSON.parse(userStr) : null
}

// Login user
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
    return { success: true, user }
  }

  return { success: false, message: "Invalid email or password" }
}

// Register user
function registerUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]")

  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    return { success: false, message: "Email already registered" }
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    playlists: [],
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))
  localStorage.setItem("currentUser", JSON.stringify(newUser))

  return { success: true, user: newUser }
}

// Logout user
function logoutUser() {
  localStorage.removeItem("currentUser")
  window.location.href = "index.html"
}

// Update navigation based on auth state
function updateNavigation() {
  const authLink = document.getElementById("authLink")
  const registerLink = document.getElementById("registerLink")

  if (!authLink) return

  if (isLoggedIn()) {
    authLink.textContent = "Logout"
    authLink.href = "#"
    authLink.addEventListener("click", (e) => {
      e.preventDefault()
      logoutUser()
    })

    if (registerLink) {
      registerLink.style.display = "none"
    }
  } else {
    authLink.textContent = "Login"
    authLink.href = "login.html"

    if (registerLink) {
      registerLink.style.display = "block"
    }
  }
}

// Initialize auth state
document.addEventListener("DOMContentLoaded", updateNavigation)
