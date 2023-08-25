const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const today = new Date();

function initializeYearInput() {
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

function initializeDateInput() {
	dateInput.min = today.toISOString().slice(0, 10);

  let recentlySelectedDate = '';

  dateInput.addEventListener('change', function(event) {
    if ([0, 6].includes(new Date(this.value).getUTCDay())){
      event.preventDefault();
      this.value = recentlySelectedDate;
    } else {
      recentlySelectedDate = this.value;
      timeInput.value = timeInput.value === '' ? '' : roundTime(timeInput.value);
    }
  });
}

function initializeTimeInput() {
  document.getElementById('time').addEventListener('change', function() {
    this.value = roundTime(this.value);
  });
}

function roundTime(time) {
	let hour = parseInt(time.slice(0, 2));
	let minute = parseInt(time.slice(3, 5));

  return (
    hour < 8 ? '08:00' :
    new Date(dateInput.value).getUTCDay() === 5 && hour + minute / 60 >= 13.5 ? '13:30' :
    hour >= 17 ? '17:00' :
    minute > 45 ? `${(hour + 1).toString().length === 1 ? '0' + (hour + 1) : hour + 1}:00` :
    minute < 15 ? `${time.slice(0, 2)}:00` : `${time.slice(0, 2)}:30`
  );
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
initializeDateInput();
initializeTimeInput();
initializeModal();
