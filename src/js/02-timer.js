import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let chosenDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
      return;
    }
    startBtn.removeAttribute('disabled');
    timeMs();
  },
};

const fp = flatpickr(inputEl, options);

let time = 0;

function timeMs() {
  const today = new Date();
  time = chosenDate.getTime() - today.getTime();
  const convertTime = convertMs(time);
  timeAdded(convertTime);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timeAdded({ days, hours, minutes, seconds }) {
  const finalFormat = addLeadingZero({ days, hours, minutes, seconds });
  daysEl.textContent = `${finalFormat[0]}`;
  hoursEl.textContent = `${finalFormat[1]}`;
  minutesEl.textContent = `${finalFormat[2]}`;
  secondsEl.textContent = `${finalFormat[3]}`;
}

let timerId = 0;

function counterFunc() {
  time = time - 1000;
  timeAdded(convertMs(time));
  if (time < 1000) {
    clearFunc(timerId);
  }
}

function clearFunc(timerId) {
  clearInterval(timerId);
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(counterFunc, 1000);
});

function addLeadingZero(value) {
  const valueArray = [];
  for (const key in value) {
    valueArray.push(value[key].toString().padStart(2, '0'));
  }
  return valueArray;
}
