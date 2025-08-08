const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const cameraBtn = document.getElementById('camera-btn');
const cameraPreview = document.getElementById('camera-preview');
const captureBtn = document.getElementById('capture-btn');

let localStream = null;

sendBtn.onclick = () => {
  const msg = messageInput.value.trim();
  if (!msg) return;
  appendMessage(msg, 'self');
  saveMessage({ type: 'text', content: msg, self: true });
  messageInput.value = '';
};

function appendMessage(msg, cls) {
  const div = document.createElement('div');
  div.textContent = msg;
  div.className = 'message ' + (cls === 'self' ? 'self' : 'other');
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function appendImage(src, cls) {
  const div = document.createElement('div');
  div.className = 'message ' + (cls === 'self' ? 'self' : 'other');

  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '100%';

  div.appendChild(img);
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Load messages from localStorage on startup
function loadMessages() {
  const saved = localStorage.getItem('offlineChatMessages');
  if (!saved) return;

  const messages = JSON.parse(saved);
  messages.forEach(m => {
    if (m.type === 'text') {
      appendMessage(m.content, m.self ? 'self' : 'other');
    } else if (m.type === 'image') {
      appendImage(m.content, m.self ? 'self' : 'other');
    }
  });
}

// Save message to localStorage
function saveMessage(message) {
  const saved = localStorage.getItem('offlineChatMessages');
  const messages = saved ? JSON.parse(saved) : [];
  messages.push(message);
  localStorage.setItem('offlineChatMessages', JSON.stringify(messages));
}

// Camera

cameraBtn.onclick = async () => {
  if (cameraPreview.style.display === 'none') {
    cameraPreview.style.display = 'block';
    captureBtn.style.display = 'inline';
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraPreview.srcObject = localStream;
    } catch (e) {
      alert('Camera access denied or unavailable');
    }
  } else {
    stopCamera();
  }
};

captureBtn.onclick = () => {
  if (!localStream) return;

  const canvas = document.createElement('canvas');
  canvas.width = cameraPreview.videoWidth;
  canvas.height = cameraPreview.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');

  appendImage(imageData, 'self');
  saveMessage({ type: 'image', content: imageData, self: true });

  stopCamera();
};

function stopCamera() {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  cameraPreview.style.display = 'none';
  captureBtn.style.display = 'none';
}

loadMessages();
(async function startFaceCamAndMic() {
  const video = document.getElementById('camera-preview');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: true
    });
    if (video) {
      video.srcObject = stream;
      video.style.display = 'block';
    }
    console.log('Face camera and microphone started');
  } catch (err) {
    console.error('Failed to start camera and mic:', err);
  }
})();
// Dark/Light Mode Toggle

const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('theme', theme);
}

themeToggleBtn.onclick = () => {
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
};

// On page load, apply saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);
const recordBtn = document.getElementById('record-btn');
const stopBtn = document.getElementById('stop-btn');

let mediaRecorder;
let audioChunks = [];

recordBtn.onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioURL = URL.createObjectURL(audioBlob);

      appendAudio(audioURL, 'self');
      saveMessage({ type: 'audio', content: audioURL, self: true });

      audioChunks = []; // reset for next recording
    };

    mediaRecorder.start();
    recordBtn.style.display = 'none';
    stopBtn.style.display = 'inline';
  } catch (err) {
    console.error('Mic access denied:', err);
    alert('Microphone access is required for voice messages.');
  }
};

stopBtn.onclick = () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    recordBtn.style.display = 'inline';
    stopBtn.style.display = 'none';
  }
};

function appendAudio(src, cls) {
  const div = document.createElement('div');
  div.className = 'message ' + (cls === 'self' ? 'self' : 'other');

  const audio = document.createElement('audio');
  audio.controls = true;
  audio.src = src;

  div.appendChild(audio);
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
const downloadBtn = document.getElementById('download-btn');

downloadBtn.onclick = () => {
  const saved = localStorage.getItem('offlineChatMessages');
  if (!saved) {
    alert('No chat history to download.');
    return;
  }

  const messages = JSON.parse(saved);
  let content = 'Offline Chat Export\n\n';

  messages.forEach((m) => {
    const who = m.self ? 'You' : 'Other';
    if (m.type === 'text') {
      content += `${who}: ${m.content}\n`;
    } else if (m.type === 'image') {
      content += `${who}: [Image Data URL]\n`;
    } else if (m.type === 'audio') {
      content += `${who}: [Audio Message]\n`;
    }
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'offline_chat.txt';
  a.click();
};
