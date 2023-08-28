function initializeYearInput() {
  const today = new Date();
  const yearInput = document.getElementById('year');
  const currentYear = today.getFullYear();
  const minYear = 1900;
  yearInput.addEventListener('change', function() {
    if (this.value > currentYear) {
      this.value = currentYear;
    } else if (this.value < minYear) {
      this.value = minYear;
    }
  });
  
  yearInput.addEventListener('keypress', event => {
    if (!/^\d/.test(event.key)) {
      event.preventDefault();
    }
  });
}

function initializeSelect(className, list) {
  Array.prototype.forEach.call(document.getElementsByClassName(className), select => {
    for (let i = 0; i < list.length; i++) {
      select.innerHTML += `<option value=${list[i].replace(' ', '+')}>${list[i]}</option>`;
    }
  });
}

function initializeModal() {
  const modal = document.querySelector('dialog');
  document.querySelector('dialog > button').addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', event => {
    const modalDimentions = modal.getBoundingClientRect();

    if (
      event.clientX < modalDimentions.left || event.clientX > modalDimentions.right ||
      event.clientY < modalDimentions.top || event.clientY > modalDimentions.bottom
    ) {
      modal.close();
    }
  });

  if (modal.classList.contains('active')) {
    modal.showModal();
  }
}

function checkFormValidation() {
  const makeSelect = document.getElementById('make');
  const serviceSelects = document.getElementsByClassName('service');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const submitInput = document.querySelector('input[type="submit"]');

  submitInput.addEventListener('click', () => {
    if (makeSelect.value === '0') {
      makeSelect.setCustomValidity('Please select a make.');
    } else {
      makeSelect.setCustomValidity('');
    }

    if (serviceSelects[0].value === '0' && serviceSelects[1].value === '0' && serviceSelects[2].value === '0') {
      serviceSelects[0].setCustomValidity('Please select at least 1 service.');
    } else {
      serviceSelects[0].setCustomValidity('');
    }

    const [year, month, day] = dateInput.value.split('-').map(Number);
    const dayOfWeek = (day + Math.floor((13 * (month + 1)) / 5) + year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400)) % 7;
    
    if ([0, 1].includes(dayOfWeek)) {
      dateInput.setCustomValidity('Please select a weekday.');
    } else {
      dateInput.setCustomValidity('');
    }

    dateInput.addEventListener('input', () => {
      dateInput.setCustomValidity('');
    });

    const time = Number(timeInput.value.slice(0, 2)) + Number(timeInput.value.slice(3, 5)) / 60;

    if (timeInput.value !== '' && timeInput.value !== null) {
      if (dayOfWeek === 6 && (time < 8 || time > 13.5)) {
        timeInput.setCustomValidity('Please select a time between 8:00 AM and 1:30 PM.');
      } else if (time < 8 || time > 17) {
        timeInput.setCustomValidity('Please select a time between 8:00 AM and 5 PM.');
      } else {
        timeInput.setCustomValidity('');
      }
    }

    timeInput.addEventListener('input', () => {
      timeInput.setCustomValidity('');
    });
  });
}

const makes = [
  'Abarth', 'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Cadillac', 'Chevrolet', 'Chrysler',
  'Citroën', 'Dacia', 'Daewoo', 'Daihatsu', 'Dodge', 'Donkervoort', 'DS', 'Ferrari', 'Fiat', 'Fisker',
  'Ford', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Iveco', 'Jaguar', 'Jeep', 'Kia', 'KTM', 
  'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Landwind', 'Lexus', 'Lotus', 'Maserati', 'Maybach', 'Mazda',
  'McLaren', 'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'Morgan', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 
  'Renault', 'Rolls-Royce', 'Rover', 'Saab', 'Seat', 'Skoda', 'Smart', 'SsangYong', 'Subaru', 'Suzuki',
  'Tesla', 'Toyota', 'Volkswagen', 'Volvo',
];

const services = [
  'Test Service', '2', '3', '4',
];

initializeSelect('make', makes);
initializeYearInput();
initializeSelect('service', services);
initializeModal();
checkFormValidation();
