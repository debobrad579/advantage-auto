function animateNavbar() {
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
}

function createYearSelect() {
  let today = new Date();
  let year = today.getFullYear();

  document.getElementById('date-input').min = today.toISOString().slice(0, 10);

  for (let i = year; i >= 1980; i--) {
    document.getElementById('year-select').innerHTML += `<option value=${i}>${i}</option>`;
  }
}

function createModelSelect() {
  let makes = [
    'Abarth', 'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Cadillac', 'Chevrolet', 'Chrysler',
    'Citroën', 'Dacia', 'Daewoo', 'Daihatsu', 'Dodge', 'Donkervoort', 'DS', 'Ferrari', 'Fiat', 'Fisker',
    'Ford', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Iveco', 'Jaguar', 'Jeep', 'Kia', 'KTM', 
    'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Landwind', 'Lexus', 'Lotus', 'Maserati', 'Maybach', 'Mazda',
    'McLaren', 'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'Morgan', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 
    'Renault', 'Rolls-Royce', 'Rover', 'Saab', 'Seat', 'Skoda', 'Smart', 'SsangYong', 'Subaru', 'Suzuki',
    'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
  ];

  for (let i = 0; i < makes.length; i++) {
    document.getElementById('make-select').innerHTML += `<option value=${makes[i].replace(' ', '-')}>${makes[i]}</option>`;
  }
}

function createTimeSelect() {
  const openTime = 8;
  const closeTime = 17;
  const increment = 30;
  
  for (let hours = openTime; hours <= closeTime; hours++) {
    for (let minutes = 0; minutes < 60; minutes += increment) {
      if (hours === closeTime && minutes !== 0) {
        continue;
      }
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours === 12 ? 12 : hours % 12;
      timeSelect = document.getElementById('time-select').innerHTML += `<option value=${hours}:${minutes}>${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}</option>`;
    }
  }
}

animateNavbar();
createYearSelect();
createModelSelect();
createTimeSelect();
