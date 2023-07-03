const heros = document.querySelectorAll('#hero .hero');

let currentSlide = 0;
let timer;

function showSlides() {
  heros.forEach((hero, index) => {
    if (index === currentSlide) {
      hero.style.display = 'flex';
    } else {
      hero.style.display = 'none';
    }
  });
}

function startTimer() {
  timer = setTimeout(() => {
    if (currentSlide === 2) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    showSlides();
    startTimer();
  }, 5000);
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = 2;
  } else {
    currentSlide--;
  }
  clearTimeout(timer);
  showSlides();
  startTimer();
}

function nextSlide() {
  if (currentSlide === 2) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  clearTimeout(timer);
  showSlides();
  startTimer();
}

startTimer();
showSlides();
