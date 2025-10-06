// Contact form functionality

const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Simulate form submission
  formMessage.textContent = "Thank you for your message! We'll get back to you soon."
  formMessage.className = "form-message success"

  // Reset form
  contactForm.reset()

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = "none"
  }, 5000)
})
