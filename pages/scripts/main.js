// Main JavaScript file for common functionality

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })
}

// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements with animation classes
document.querySelectorAll(".animate-fade-in, .animate-slide-left, .animate-slide-right").forEach((el) => {
  observer.observe(el)
})

// Toast Notification System
function showToast(message, type = "info", duration = 3000) {
  // Create container if it doesn't exist
  let container = document.querySelector(".toast-container")
  if (!container) {
    container = document.createElement("div")
    container.className = "toast-container"
    document.body.appendChild(container)
  }

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`

  // Set icon based on type
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  }

  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close">×</button>
  `

  // Add to container
  container.appendChild(toast)

  // Close button functionality
  const closeBtn = toast.querySelector(".toast-close")
  closeBtn.addEventListener("click", () => removeToast(toast))

  // Click to dismiss
  toast.addEventListener("click", (e) => {
    if (e.target !== closeBtn) {
      removeToast(toast)
    }
  })

  // Auto remove after duration
  setTimeout(() => removeToast(toast), duration)
}

function removeToast(toast) {
  if (!toast || toast.classList.contains("toast-hide")) return

  toast.classList.add("toast-hide")
  setTimeout(() => {
    if (toast.parentElement) {
      toast.parentElement.removeChild(toast)
    }
  }, 400)
}

// Make showToast globally available
window.showToast = showToast

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const suffix = element.getAttribute("data-suffix") || ""
  const duration = 2000 // 2 seconds
  const steps = 60
  const stepDuration = duration / steps
  const increment = target / steps
  let current = 0
  let step = 0

  const timer = setInterval(() => {
    step++
    current = Math.min(Math.round(increment * step), target)

    // Format number with K suffix for thousands
    if (target >= 1000) {
      element.textContent = (current / 1000).toFixed(current >= target ? 0 : 1) + "K" + suffix
    } else {
      element.textContent = current + suffix
    }

    if (step >= steps) {
      clearInterval(timer)
      // Ensure final value is correct
      if (target >= 1000) {
        element.textContent = target / 1000 + "K" + suffix
      } else {
        element.textContent = target + suffix
      }
    }
  }, stepDuration)
}

// Intersection observer for stats counter animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number[data-target]")
        statNumbers.forEach((stat) => {
          if (!stat.classList.contains("animated")) {
            stat.classList.add("animated")
            animateCounter(stat)
          }
        })
      }
    })
  },
  { threshold: 0.3 },
)

// Observe stats section
const statsSection = document.querySelector(".stats")
if (statsSection) {
  statsObserver.observe(statsSection)
}
