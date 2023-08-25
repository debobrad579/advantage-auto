const vehicleYearInput = document.getElementById('year-input')
const serviceDateInput = document.getElementById('date-input');
const serviceTimeInput = document.getElementById('time-input');
const textarea = document.querySelector('textarea');
const today = new Date();
const currentYear = today.getFullYear();
const minVehicleYear = 1900
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

function initializeVehicleYearInput() {
  vehicleYearInput.addEventListener('change', function() {
    if (this.value > currentYear) {
      this.value = currentYear;
    } else if (this.value < minVehicleYear) {
      this.value = minVehicleYear;
    }
  });
  
  vehicleYearInput.addEventListener('keypress', event => {
    if (!/^\d/.test(event.key)) {
      event.preventDefault();
    }
  });
}

function initializeServiceDateInput() {
	serviceDateInput.min = today.toISOString().slice(0, 10);

  let recentlySelectedDate = '';

  serviceDateInput.addEventListener('change', function(event) {
    if([0, 6].includes(new Date(this.value).getUTCDay())){
      event.preventDefault();
      this.value = recentlySelectedDate;
    } else {
      recentlySelectedDate = this.value;
      serviceTimeInput.value = serviceTimeInput.value !== '' ? roundTime(serviceTimeInput.value) : serviceTimeInput.value;
    }
  });
}

function initializeServiceTimeInput() {
  serviceTimeInput.addEventListener('change', function() {
    this.value = roundTime(this.value);
  });
}

function roundTime(time) {
	let hour = parseInt(time.slice(0, 2));
	let minute = parseInt(time.slice(3, 5));

	if (hour < 8) {
		return '08:00';
	} else if (new Date(serviceDateInput.value).getUTCDay() === 5 && hour + minute / 60 >= 13.5) {
		return '13:30';
	} else if (hour >= 17) {
		return '17:00';
	} else if (minute > 45) {
		hour++;
		return `${hour.toString().length === 1 ? '0' + hour : hour}:00`;
	} else if (minute < 15) {
		return `${time.slice(0, 2)}:00`;
	} else {
		return `${time.slice(0, 2)}:30`;
	}
}

function initializeSelect(id, list) {
  for (let i = 0; i < list.length; i++) {
    document.getElementById(id).innerHTML += `<option value=${list[i].replace(' ', '+')}>${list[i]}</option>`;
  }
}

function initializeTextarea() {
	const defaultHeight = 80;
	textarea.style.height = defaultHeight + 'px';

	textarea.addEventListener('input', function() {
		this.style.height = 'auto';
		this.style.height = Math.max(defaultHeight, this.scrollHeight) + 'px';
	}, false);
}

initializeVehicleYearInput();
initializeSelect('make-select', makes);
initializeSelect('service-select', services);
initializeServiceDateInput();
initializeServiceTimeInput();
initializeTextarea();
