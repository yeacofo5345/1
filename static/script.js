const openBtn = document.getElementById('openBtn');
const message = document.getElementById('message');
const surpriseBtn = document.getElementById('surpriseBtn');
const congratsText = document.getElementById('congratsText');
const mainCard = document.getElementById('mainCard');
const backBtn = document.getElementById('backBtn');

// 1. Нажатие на "Открыть"
openBtn.addEventListener('click', () => {
  message.classList.add('show');
  openBtn.style.display = 'none';

  setTimeout(() => {
    surpriseBtn.classList.add('show-btn');
  }, 500);
});

// 2. Нажатие на "ТЫК"
surpriseBtn.addEventListener('click', () => {
  surpriseBtn.style.transform = 'scale(0.95)';
  surpriseBtn.textContent = '💖';

  mainCard.classList.add('blur-active');
  congratsText.classList.add('show');
});

// 3. Нажатие на "Назад"
backBtn.addEventListener('click', () => {
  mainCard.classList.remove('blur-active');
  congratsText.classList.remove('show');

  setTimeout(() => {
    surpriseBtn.style.transform = '';
    surpriseBtn.textContent = 'ТЫК';
  }, 500);
});

// Летающие сердечки на фоне
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