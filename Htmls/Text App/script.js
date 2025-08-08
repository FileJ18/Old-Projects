const editor = document.getElementById('editor');
const openBtn = document.getElementById('openBtn');
const saveBtn = document.getElementById('saveBtn');
const fileInput = document.getElementById('fileInput');
const fileTypeSelect = document.getElementById('fileTypeSelect');

// Open file handler
openBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    editor.value = e.target.result;
  };
  reader.readAsText(file);
});

// Save file handler with extension option
saveBtn.addEventListener('click', () => {
  const extension = fileTypeSelect.value;
  const filename = `untitled.${extension}`;
  const blob = new Blob([editor.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
});
