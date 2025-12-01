// Song detail page functionality - Pure JavaScript

// Declare global auth functions
function isLoggedIn() {
  // Placeholder implementation
  return false
}

function getCurrentUser() {
  // Placeholder implementation
  return { id: "1", playlists: [] }
}

async function loadSongDetail() {
  const urlParams = new URLSearchParams(window.location.search)
  const songId = urlParams.get("id")

  if (!songId) {
    window.location.href = "explore.html"
    return
  }

  try {
    const response = await fetch("data/songs.json")
    const songs = await response.json()
    const song = songs.find((s) => s.id === songId)

    if (!song) {
      window.location.href = "explore.html"
      return
    }

    displaySongDetail(song)
  } catch (error) {
    console.error("Error loading song details:", error)
  }
}

function displaySongDetail(song) {
  const container = document.getElementById("songDetailContainer")

  container.innerHTML = `
    <div class="song-hero">
      <div class="song-cover" style="background: linear-gradient(135deg, #ff3366, #00d9ff)">
        🎵
      </div>
      <div class="song-info">
        <h1 class="song-title">${song.title}</h1>
        <p class="song-artist">${song.artist}</p>
        <div class="song-meta">
          <div class="meta-item">
            <span class="meta-label">Genre</span>
            <span class="meta-value">${song.genre}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Year</span>
            <span class="meta-value">${song.year}</span>
          </div>
          ${
            song.album
              ? `
            <div class="meta-item">
              <span class="meta-label">Album</span>
              <span class="meta-value">${song.album}</span>
            </div>
          `
              : ""
          }
        </div>
        <div class="song-tags">
          <span class="song-tag">${song.genre}</span>
          <span class="song-tag">${song.year}</span>
        </div>
        <div class="song-actions">
          <button class="action-btn btn-add-playlist" onclick="addToPlaylistFromDetail('${song.id}')">
            Add to Playlist
          </button>
        </div>
      </div>
    </div>
    
    ${
      song.artistInfo
        ? `
      <div class="detail-section">
        <h2>About the Artist</h2>
        <p>${song.artistInfo}</p>
      </div>
    `
        : ""
    }
    
    ${
      song.albumInfo
        ? `
      <div class="detail-section">
        <h2>Album Information</h2>
        <div class="album-info">
          <div class="album-cover">💿</div>
          <div class="album-details">
            <h3>${song.album}</h3>
            <p>${song.albumInfo}</p>
          </div>
        </div>
      </div>
    `
        : ""
    }
    
    ${
      song.history && song.history.length > 0
        ? `
      <div class="detail-section">
        <h2>Creation History</h2>
        <div class="timeline">
          ${song.history
            .map(
              (item) => `
            <div class="timeline-item">
              <div class="timeline-date">${item.date}</div>
              <div class="timeline-content">${item.event}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `
        : ""
    }
  `
}

function addToPlaylistFromDetail(songId) {
  // Load song data
  fetch("data/songs.json")
    .then((response) => response.json())
    .then((songs) => {
      const song = songs.find((s) => s.id === songId)

      if (!song) {
        showToast("Song not found", "error")
        return
      }

      // Get or create playlist in localStorage
      const playlist = JSON.parse(localStorage.getItem("myPlaylist") || "[]")

      // Check if song already in playlist
      if (playlist.find((s) => s.id === songId)) {
        showToast("Song already in your playlist!", "warning")
        return
      }

      playlist.push(song)
      localStorage.setItem("myPlaylist", JSON.stringify(playlist))

      showToast("Song added to your playlist!", "success")
    })
    .catch((error) => {
      showToast("Error adding song to playlist", "error")
    })
}

// Initialize
document.addEventListener("DOMContentLoaded", loadSongDetail)

// Function to show toast messages
function showToast(message, type) {
  const toastContainer = document.createElement("div")
  toastContainer.className = `toast ${type}`
  toastContainer.textContent = message
  document.body.appendChild(toastContainer)

  setTimeout(() => {
    document.body.removeChild(toastContainer)
  }, 3000)
}
