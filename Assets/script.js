  const numberEl = document.getElementById("number");
  const btn = document.getElementById("btn");
  const tick = document.getElementById("tick");

  // warna utama
  const colors = ["#ff5252","#ff9800","#ffeb3b","#4caf50","#2196f3","#3f51b5","#9c27b0"];

  // ============= ANGKA RANDOM =============
  function randomNumber() {
    return Math.floor(Math.random() * 500) + 1;
  }

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ================= SPIN =================
  function spin() {
    btn.disabled = true;

    let duration = 4000;
    let start = Date.now();

    function animate() {
      let elapsed = Date.now() - start;
      let progress = elapsed / duration;

      let easeOut = 1 - Math.pow(1 - progress, 4);
      let delay = 20 + (easeOut * 200);

      numberEl.innerText = String(randomNumber()).padStart(3, '0');

      numberEl.style.color = randomColor();
      numberEl.style.transform = "scale(1.3)";
      setTimeout(() => numberEl.style.transform = "scale(1)", 80);

      tick.currentTime = 0;
      tick.play();

      if (progress < 1) {
        setTimeout(animate, delay);
      } else {
        setTimeout(() => finish(), 300);
      }
    }

    animate();
  }

  // ================= HASIL AKHIR =================
  function finish() {
    let final = randomNumber();

    numberEl.innerText = String(final).padStart(3, '0');
    numberEl.style.color = "#00e5ff";
    numberEl.style.transform = "scale(1.6)";

    // flash efek
    document.body.style.background = "#222";
    setTimeout(() => document.body.style.background = "#111", 100);

    // confetti
    createConfetti();
    drawConfetti();

    // suara menang
    new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3").play();

    btn.disabled = false;
  }

  // ================= CONFETTI =================
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confettis = [];

  function createConfetti() {
    confettis = [];
    for (let i = 0; i < 180; i++) {
      confettis.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * 360
      });
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettis.forEach(c => {
      c.y += c.speed;
      c.x += Math.sin(c.angle * Math.PI / 180);
      c.angle += 5;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle * Math.PI / 180);

      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size/2, -c.size/2, c.size, c.size);

      ctx.restore();
    });

    confettis = confettis.filter(c => c.y < canvas.height);

    if (confettis.length > 0) {
      requestAnimationFrame(drawConfetti);
    }
  }

  // responsive
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
