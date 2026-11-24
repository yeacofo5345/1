const openBtn = document.getElementById('openBtn');
const message = document.getElementById('message');
const surpriseBtn = document.getElementById('surpriseBtn');
const congratsText = document.getElementById('congratsText');
const mainCard = document.getElementById('mainCard');
const backBtn = document.getElementById('backBtn');
const bgMusic = document.getElementById('bgMusic');

// ===== САЛЮТ =====
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId = null;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const colors = ['#ff6b9d', '#d6336c', '#ffb3d1', '#ffd93d', '#a78bfa', '#7dd3fc'];

function createExplosion(x, y) {
  for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 12;

    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 15,
      gravity: 0.15,
      life: 1,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.98;
    p.vy *= 0.98;
    p.rotation += p.rotSpeed;
    p.life -= 0.01;

    ctx.save();
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });

  particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 50);

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

// Запускаем салют 1 раз при загрузке страницы
window.addEventListener('load', () => {
  // Делаем 3 взрыва в разных местах с небольшой задержкой
  setTimeout(() => createExplosion(canvas.width * 0.2, canvas.height * 0.3), 200);
  setTimeout(() => createExplosion(canvas.width * 0.8, canvas.height * 0.4), 600);
  setTimeout(() => createExplosion(canvas.width * 0.5, canvas.height * 0.7), 1000);
  animate();
});

// ===== ОСТАЛЬНАЯ ЛОГИКА =====
openBtn.addEventListener('click', () => {
  if(bgMusic) {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(e => console.log("Браузер заблокировал звук"));
  }

  message.classList.add('show');
  openBtn.style.display = 'none';

  setTimeout(() => {
    surpriseBtn.classList.add('show-btn');
  }, 500);
});

surpriseBtn.addEventListener('click', () => {
  surpriseBtn.style.transform = 'scale(0.95)';
  surpriseBtn.textContent = '💖';

  mainCard.classList.add('blur-active');
  congratsText.classList.add('show');
});

backBtn.addEventListener('click', () => {
  mainCard.classList.remove('blur-active');
  congratsText.classList.remove('show');

  setTimeout(() => {
    surpriseBtn.style.transform = '';
    surpriseBtn.textContent = 'ТЫК';
  }, 500);
});

// Сердечки на фоне
const heartsContainer = document.getElementById('hearts');
const heartEmojis = ['💖', '💕', '💗', '🌸', '✨', '🎀'];

function spawnHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (16 + Math.random() * 24) + 'px';
  heart.style.animationDuration = (8 + Math.random() * 8) + 's';
  heart.style.animationDelay = Math.random() * 2 + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 18000);
}

setInterval(spawnHeart, 700);
for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 200);