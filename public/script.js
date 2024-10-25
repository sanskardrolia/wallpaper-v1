// Theme toggling logic
const toggleButton = document.getElementById('toggle-theme');

// Check for saved theme in localStorage and apply it
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    // Save the theme preference in localStorage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Fetch and display wallpapers using Pexels API
const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your API key
const wallpaperContainer = document.getElementById('wallpaper');
const refreshButton = document.getElementById('refresh-btn');
const downloadButton = document.getElementById('download-btn');

async function fetchWallpaper() {
    try {
        const response = await fetch('https://api.pexels.com/v1/search?query=nature&per_page=1', {
            headers: {
                Authorization: API_KEY
            }
        });

        const data = await response.json();
        const wallpaperUrl = data.photos[0].src.large;

        wallpaperContainer.src = wallpaperUrl;
        downloadButton.href = wallpaperUrl; // Set download link to the image URL
        downloadButton.setAttribute('download', 'wallpaper.jpg');
    } catch (error) {
        console.error('Error fetching wallpaper:', error);
    }
}

refreshButton.addEventListener('click', fetchWallpaper);

// Load an initial wallpaper on page load
fetchWallpaper();
