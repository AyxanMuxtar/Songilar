// Login page functionality - Pure JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const formMessage = document.getElementById("formMessage")

  if (!loginForm) return

  const loginUser = (email, password) => {
    // Placeholder for actual login logic
    return { success: false, message: "Login failed. Please check your credentials." }
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const result = loginUser(email, password)

    if (result.success) {
      formMessage.textContent = "Login successful! Redirecting..."
      formMessage.className = "form-message success"

      setTimeout(() => {
        window.location.href = "explore.html"
      }, 1000)
    } else {
      formMessage.textContent = result.message
      formMessage.className = "form-message error"
    }
  })
})
