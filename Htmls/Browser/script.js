const urlInput = document.getElementById('urlInput');
const iframe = document.querySelector('.webview');

function navigate() {
  let url = urlInput.value.trim();
  if (!url.startsWith("http")) {
    url = "https://duckduckgo.com/?q=" + encodeURIComponent(url);
  } else if (!url.startsWith("https://") && !url.startsWith("http://")) {
    url = "https://" + url;
  }
  iframe.src = url;
}

urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    navigate();
  }
});

function switchTab(index) {
  // For future use when adding multiple tabs
  console.log("Switched to tab:", index);
}
