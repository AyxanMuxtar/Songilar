// Explore page functionality with live search - Pure JavaScript

let allSongs = []
let currentFilter = "all"

// Load songs from JSON
async function loadSongs() {
  try {
    const response = await fetch("data/songs.json")
    allSongs = await response.json()
    displaySongs(allSongs)
  } catch (error) {
    console.error("Error loading songs:", error)
    showNoResults()
  }
}

// Display songs in grid
function displaySongs(songs) {
  const musicGrid = document.getElementById("musicGrid")
  const resultsInfo = document.getElementById("resultsInfo")
  const noResults = document.getElementById("noResults")

  if (songs.length === 0) {
    musicGrid.innerHTML = ""
    noResults.style.display = "block"
    resultsInfo.textContent = "No songs found"
    return
  }

  noResults.style.display = "none"
  resultsInfo.textContent = `Showing ${songs.length} song${songs.length !== 1 ? "s" : ""}`

  musicGrid.innerHTML = songs
    .map(
      (song) => `
    <div class="music-card">
      <div class="music-card-image">
        <img src="${song.cover}" alt="${song.album} album cover" onerror="this.style.display='none'; this.parentElement.innerHTML='🎵';">
      </div>
      <div class="music-card-content">
        <h3 class="music-card-title">${song.title}</h3>
        <p class="music-card-artist">${song.artist}</p>
        <div class="music-card-details">
          <span class="music-card-tag genre">${song.genre}</span>
          <span class="music-card-tag">${song.year}</span>
          ${song.album ? `<span class="music-card-tag">${song.album}</span>` : ""}
        </div>
        <div class="music-card-actions">
          <button class="card-btn btn-details" onclick="viewSongDetails('${song.id}')">
            See Details
          </button>
          <button class="card-btn btn-playlist" onclick="addToPlaylist('${song.id}')">
            + Playlist
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

// Live search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput")
  const clearBtn = document.getElementById("clearBtn")

  if (!searchInput || !clearBtn) return

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()

    // Show/hide clear button
    if (searchTerm) {
      clearBtn.classList.add("visible")
    } else {
      clearBtn.classList.remove("visible")
    }

    // Filter songs
    const filtered = allSongs.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.genre.toLowerCase().includes(searchTerm) ||
        (song.album && song.album.toLowerCase().includes(searchTerm))

      const matchesFilter = currentFilter === "all" || song.genre.toLowerCase() === currentFilter.toLowerCase()

      return matchesSearch && matchesFilter
    })

    displaySongs(filtered)
  })

  clearBtn.addEventListener("click", () => {
    searchInput.value = ""
    clearBtn.classList.remove("visible")
    filterSongs(currentFilter)
  })

  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      currentFilter = btn.dataset.filter
      filterSongs(currentFilter)
    })
  })

  // Initialize
  loadSongs()
})

function filterSongs(filter) {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()

  const filtered = allSongs.filter((song) => {
    const matchesSearch =
      !searchTerm ||
      song.title.toLowerCase().includes(searchTerm) ||
      song.artist.toLowerCase().includes(searchTerm) ||
      song.genre.toLowerCase().includes(searchTerm) ||
      (song.album && song.album.toLowerCase().includes(searchTerm))

    const matchesFilter = filter === "all" || song.genre.toLowerCase() === filter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  displaySongs(filtered)
}

// View song details
function viewSongDetails(songId) {
  window.location.href = `song-detail.html?id=${songId}`
}

function addToPlaylist(songId) {
  const song = allSongs.find((s) => s.id === songId)

  if (!song) {
    showToast("Song not found", "error")
    return
  }

  // Get or create playlist in localStorage (no user association needed)
  const playlist = JSON.parse(localStorage.getItem("myPlaylist") || "[]")

  // Check if song already in playlist
  if (playlist.find((s) => s.id === songId)) {
    showToast("Song already in your playlist!", "warning")
    return
  }

  playlist.push(song)
  localStorage.setItem("myPlaylist", JSON.stringify(playlist))

  showToast("Song added to your playlist!", "success")
}

// Helper function for random gradients
function getRandomGradient() {
  const gradients = [
    "#ff3366, #ff6b8a",
    "#00d9ff, #00f0ff",
    "#ffcc00, #ffd700",
    "#00ff88, #00ffaa",
    "#ff6b6b, #ffa500",
    "#9b59b6, #e74c3c",
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
}

function showNoResults() {
  document.getElementById("noResults").style.display = "block"
  document.getElementById("musicGrid").innerHTML = ""
}

// Helper function to show toast messages
function showToast(message, type) {
  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.textContent = message
  document.body.appendChild(toast)

  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}
