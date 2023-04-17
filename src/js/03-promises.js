const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

function promisFunc() {
  const amount = amountEl.value;
  const delayStep = stepEl.value;
  const firstDelay = delayEl.value;

  let delay = +firstDelay;

  for (let i = 1; i <= amount; i++) {
    setTimeout(() => {
      let position = i;
      createPromise(position, delay)
        .then(({ position, delay }) =>
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
        )
        .catch(({ position, delay }) =>
          console.log(`❌ Rejected promise ${position} in ${delay}ms`)
        );
      delay = delay += +delayStep;
    }, delayStep);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  setTimeout(() => promisFunc(), delayEl.value);
});
