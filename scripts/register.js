// Register page functionality - Pure JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm")
  const formMessage = document.getElementById("formMessage")

  if (!registerForm) return

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value

    // Validate passwords match
    if (password !== confirmPassword) {
      formMessage.textContent = "Passwords do not match"
      formMessage.className = "form-message error"
      return
    }

    // Validate password length
    if (password.length < 6) {
      formMessage.textContent = "Password must be at least 6 characters"
      formMessage.className = "form-message error"
      return
    }

    const registerUser = window.registerUser // Declare the variable before using it
    const result = registerUser(name, email, password)

    if (result.success) {
      formMessage.textContent = "Registration successful! Redirecting..."
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
