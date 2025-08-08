const launchBtn = document.getElementById('launchBtn');

launchBtn.addEventListener('click', () => {
  // Try launching Steam game directly by changing window.location
  window.location.href = 'steam://rungameid/322170';

  // Fallback: after 2 seconds, open Steam store page in the same tab
  setTimeout(() => {
    window.location.href = 'https://store.steampowered.com/app/322170/Geometry_Dash/';
  }, 2000);
});
