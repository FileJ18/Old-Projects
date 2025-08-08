function openApp(appName) {
  const frame = document.getElementById('app-frame');
  const windowBox = document.getElementById('app-window');

  frame.src = `apps/${appName}.html`;
  windowBox.style.display = 'block';
}

// Dragging logic
let isDragging = false;
let offsetX, offsetY;

function startDrag(e) {
  const windowBox = document.getElementById('app-window');
  isDragging = true;
  offsetX = e.clientX - windowBox.offsetLeft;
  offsetY = e.clientY - windowBox.offsetTop;
  document.onmousemove = dragWindow;
  document.onmouseup = stopDrag;
}

function dragWindow(e) {
  if (isDragging) {
    const windowBox = document.getElementById('app-window');
    windowBox.style.left = (e.clientX - offsetX) + 'px';
    windowBox.style.top = (e.clientY - offsetY) + 'px';
  }
}

function stopDrag() {
  isDragging = false;
  document.onmousemove = null;
  document.onmouseup = null;
}
