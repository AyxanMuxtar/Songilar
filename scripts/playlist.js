function loadPlaylists() {
  const container = document.getElementById("playlistContent")

  // Get playlist from localStorage (no user needed)
  const playlist = JSON.parse(localStorage.getItem("myPlaylist") || "[]")

  if (playlist.length === 0) {
    container.innerHTML = `
      <div class="playlist-empty">
        <div class="empty-icon">🎵</div>
        <h2 class="empty-title">No Songs Yet</h2>
        <p class="empty-text">Start exploring music and add songs to create your playlist!</p>
        <a href="explore.html" class="btn btn-primary">Explore Music</a>
      </div>
    `
    return
  }

  container.innerHTML = `
    <div class="playlist-list">
      <div class="playlist-item">
        <div class="playlist-item-header">
          <div class="playlist-item-info">
            <h3>My Playlist</h3>
            <p class="playlist-item-meta">${playlist.length} song${playlist.length !== 1 ? "s" : ""}</p>
          </div>
          <div class="playlist-item-actions">
            <button class="icon-btn" onclick="clearPlaylist()" title="Clear all songs">
              🗑️
            </button>
          </div>
        </div>
        <div class="playlist-songs">
          ${playlist
            .map(
              (song, index) => `
            <div class="playlist-song">
              <div class="song-number">${index + 1}</div>
              <div class="song-details">
                <div class="song-name">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
              </div>
              <button class="song-remove" onclick="removeSongFromPlaylist('${song.id}')" title="Remove song">
                ✕
              </button>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `
}

function removeSongFromPlaylist(songId) {
  let playlist = JSON.parse(localStorage.getItem("myPlaylist") || "[]")
  playlist = playlist.filter((s) => s.id !== songId)
  localStorage.setItem("myPlaylist", JSON.stringify(playlist))
  loadPlaylists()
}

function clearPlaylist() {
  if (!confirm("Are you sure you want to clear all songs from your playlist?")) {
    return
  }
  localStorage.setItem("myPlaylist", "[]")
  loadPlaylists()
}

// Initialize
document.addEventListener("DOMContentLoaded", loadPlaylists)
