const navbarToggle = document.getElementById('navbar-toggle');
const navbarLinks = document.getElementById('navbar-links');
const navbar = document.querySelector('nav');

navbarToggle.addEventListener('click', () => {
  if (navbar.classList.contains('up')) {
    navbarLinks.style.display = 'block';
  }

  navbarToggle.classList.toggle('active');
  navbarLinks.classList.toggle('down');
  navbar.classList.toggle('down');
  
  if (navbarLinks.classList.contains('initial')) {
    navbarLinks.classList.toggle('initial');
    return;
  }

  navbarLinks.classList.toggle('up');
  navbar.classList.toggle('up');

  if (navbar.classList.contains('up')) {
    setTimeout(() => {
      navbarLinks.style.display = 'none';
    }, 500);
  }
});

window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth >= 1200) {
    navbarLinks.removeAttribute('class');
    navbarLinks.classList.toggle('initial');
    navbar.removeAttribute('class');
    navbarToggle.removeAttribute('class');
  }
});
