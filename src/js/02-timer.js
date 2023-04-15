import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
      return;
    }
    startBtn.removeAttribute('disabled');
    return timeMs();
  },
};

const fp = flatpickr(inputEl, options);

function timeMs() {
  const chosenDate = new Date(fp.selectedDates[0]);
  const today = new Date();
  const time = chosenDate.getTime() - today.getTime();
  convertMs(time);
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

  return (
    (daysEl.textContent = `${days}`),
    (hoursEl.textContent = `${hours}`),
    (minutesEl.textContent = `${minutes}`),
    (secondsEl.textContent = `${seconds}`)
  );
}
