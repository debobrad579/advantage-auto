const navbarToggle = document.getElementById('navbar-toggle');
const navbarLinks = document.getElementById('navbar-links');
const navbar = document.querySelector('nav');

navbarToggle.addEventListener('click', () => {
  navbarLinks.style.transition = 'translate 0.523s ease-in-out';
  navbar.style.transition = 'height 0.5s ease-in-out';
  navbarLinks.classList.toggle('active');
  navbarToggle.classList.toggle('active');

  setTimeout(() => {
    navbar.classList.toggle('active');
  }, navbar.classList.contains('active') ? 0 : 23);
  
  setTimeout(() => {
    navbarLinks.style.transition = '';
    navbar.style.transition = '';
  }, 523);
});

window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth > 1165 
      && navbarLinks.classList.contains('active')) {
    navbarLinks.classList.toggle('active');
    navbarToggle.classList.toggle('active');
    navbar.classList.toggle('active');
  }
});

const result = document.querySelector('.result')
const form = document.querySelector('form')
form.addEventListener('submit', function(e) {
  const formData = new FormData(form)
  result.innerText = JSON.stringify(formData.getAll('select'), null, 2)
  e.preventDefault();
})