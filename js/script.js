const hamsterGifs = ["assets/gifs/1hamster.gif", "assets/gifs/3hamsters.gif"];
let isForced = false;

function forceYes() {
  if (!isForced) {
    const noBtn = document.getElementById("no-btn");
    noBtn.innerText = "TAK!";
    noBtn.style.backgroundColor = "#4caf50";
    noBtn.style.boxShadow = "0 4px 0 #388e3c";
    noBtn.onclick = celebrate;
    isForced = true;
  }
}

function spawnHamsters() {
  const safeZoneWidth = window.innerWidth * 0.55;
  const safeZoneHeight = window.innerHeight * 0.4;

  const safeLeft = (window.innerWidth - safeZoneWidth) / 2;
  const safeTop = (window.innerHeight - safeZoneHeight) / 2;

  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src =
        hamsterGifs[Math.floor(Math.random() * hamsterGifs.length)] +
        "?t=" +
        Date.now();
      img.className = "floating-hamster";

      let x, y;
      let tries = 0;

      do {
        x = Math.random() * (window.innerWidth - 140);
        y = Math.random() * (window.innerHeight - 140);
        tries++;
      } while (
        tries < 50 &&
        x > safeLeft &&
        x < safeLeft + safeZoneWidth &&
        y > safeTop &&
        y < safeTop + safeZoneHeight
      );

      img.style.left = x + "px";
      img.style.top = y + "px";
      img.style.width = Math.floor(Math.random() * 50) + 110 + "px";

      document.body.appendChild(img);
    }, i * 120);
  }
}

function celebrate() {
  const audio = document.getElementById("love-music");
  audio.play().catch(() => console.log("Audio play needs interaction"));

  document.getElementById("main-container").style.display = "none";
  document.getElementById("celebration-overlay").style.display = "flex";
  document.getElementById("hamster-band").style.display = "block";

  spawnHamsters();

  // Potężny efekt konfetti
  var duration = 20 * 1000;
  var animationEnd = Date.now() + duration;

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    // Klasyczne konfetti
    confetti({
      particleCount: 25,
      spread: 80,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ["#ff85a1", "#d63384", "#ffffff", "#ff0000"],
    });

    // Serduszka (emoji w konfetti)
    confetti({
      particleCount: 5,
      spread: 50,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      shapes: ["circle"],
      colors: ["#ff0000"],
    });
  }, 250);
}
