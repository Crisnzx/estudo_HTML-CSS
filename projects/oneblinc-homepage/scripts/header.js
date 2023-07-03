const headerUI = document.querySelector('#page-header');
const oneBlincLogoUI = document.querySelector('#oneblinc-logo');

let scrolled = false;

document.addEventListener('scroll', e => {
  if (window.scrollY > 120) {
    if (!scrolled) {
      scrolled = true;
      headerUI.classList.remove('top-page');
      headerUI.classList.add('sticky');
      oneBlincLogoUI.src = 'assets/pngs/oneblinc-logo-light.png';
    }
  } else {
    if (scrolled) {
      scrolled = false;
      headerUI.classList.add('top-page');
      headerUI.classList.remove('sticky');

      if (headerUI.classList.contains('secondary')) {
        oneBlincLogoUI.src = 'assets/pngs/oneblinc-logo-dark.png';
      } else {
        oneBlincLogoUI.src = 'assets/pngs/oneblinc-logo-light.png';
      }
    }
  }
});
