const toggleButton = document.getElementById('toggle-button');
const navbarLinks = document.getElementById('navbar-links');

toggleButton.onclick = () => {
    navbarLinks.classList.toggle('active');
}