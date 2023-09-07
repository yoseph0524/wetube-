const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

const handleStartBtn = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

startBtn.addEventListener("click", handleStartBtn);
