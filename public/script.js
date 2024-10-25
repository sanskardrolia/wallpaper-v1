// Fetch the API key from the server
async function getApiKey() {
  const response = await fetch('/api-key');
  const data = await response.json();
  return data.apiKey;
}

// Fetch wallpapers from Pexels API and display them on the page
async function fetchWallpapers(query = 'Dark Car') {
    try {
      const apiKey = await getApiKey();
      const randomPage = Math.floor(Math.random() * 100) + 1;

      const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=9&page=${randomPage}`, {
        headers: {
          Authorization: apiKey
        }
      });
      const data = await response.json();
      displayWallpapers(data.photos);
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
    }
}

// Display wallpapers in the grid
function displayWallpapers(wallpapers) {
  const wallpapersContainer = document.getElementById('wallpapers');
  wallpapersContainer.innerHTML = ''; // Clear previous wallpapers

  wallpapers.forEach((photo) => {
    const wallpaperCard = document.createElement('div');
    wallpaperCard.classList.add('wallpaper-card');

    const img = document.createElement('img');
    img.src = photo.src.large;
    img.alt = photo.photographer;
    img.loading = "lazy"; // Lazy load images
    img.addEventListener('click', () => {
      window.open(photo.src.original, '_blank'); // Open original wallpaper in new tab
    });

    wallpaperCard.appendChild(img);
    wallpapersContainer.appendChild(wallpaperCard);
  });
}

// Refresh wallpapers on button click
document.getElementById('refreshBtn').addEventListener('click', () => fetchWallpapers());

// Handle search functionality
document.getElementById('searchBtn').addEventListener('click', () => {
  const searchQuery = document.getElementById('searchInput').value;
  if (searchQuery) {
    fetchWallpapers(searchQuery);
  }
});

// Theme toggle functionality
document.getElementById('themeToggleBtn').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const themeIcon = document.getElementById('themeIcon');
  themeIcon.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙'; // Toggle between sun and moon icons
});

// Initial load
fetchWallpapers();
