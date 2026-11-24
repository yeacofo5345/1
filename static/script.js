// Добавляем эффект волны (ripple) для всех кнопок
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const openBtn = document.getElementById('openBtn');
const message = document.getElementById('message');
const surpriseBtn = document.getElementById('surpriseBtn');
const congratsText = document.getElementById('congratsText');

// 1. Нажатие на "Открыть"
openBtn.addEventListener('click', () => {
  message.classList.add('show'); // Показываем блок с QR

  // Скрываем первую кнопку
  openBtn.style.display = 'none';

  // Показываем вторую кнопку "ТЫК" с задержкой (когда QR уже выехал)
  setTimeout(() => {
    surpriseBtn.classList.add('show-btn');
  }, 500);
});

// 2. Нажатие на "ТЫК"
surpriseBtn.addEventListener('click', () => {
  // Меняем кнопку на сердечко
  surpriseBtn.style.transform = 'scale(0.95)';
  surpriseBtn.textContent = '💖';

  // Запускаем текст
  congratsText.classList.add('show');
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