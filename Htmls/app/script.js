// Replace with your image path
const imagePath = "file:///sdcard/Pictures/sample.jpg";

window.onload = () => {
  const photo = document.getElementById("photo");
  photo.src = imagePath;
};
