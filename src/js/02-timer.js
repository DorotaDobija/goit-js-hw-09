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
    console.log(selectedDates[0]);
    return timeMs();
  },
};

const fp = flatpickr(inputEl, options);

function timeMs() {
  const chosenDate = new Date(fp.selectedDates[0]);
  const eventDate = new Date('2023-04-21 12:00:00');
  const time = eventDate.getTime() - chosenDate.getTime();
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
