// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const inputDelay = document.querySelector('input[name="delay"]');
  const delay = parseInt(inputDelay.value);
  const inputState = document.querySelector('input[name="state"]:checked');
  const state = inputState.value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  promise.then((result) => {
    iziToast.success({
      title: "Notification",
      message: `✅ Fulfilled promise in ${result}ms`,
      position: "bottomRight",
    });
  }).catch((error) => {
    iziToast.error({
      title: "Notification",
      message: `❌ Rejected promise in ${error}ms`,
      position: "bottomRight",
    });
  });
}



