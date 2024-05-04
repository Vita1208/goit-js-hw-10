import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
let userSelectedDate = null;
let countdownInterval = null;


function updateTimer() {
    datetimePicker.disabled = true;
    startButton.disabled = true;

    const currentTime = new Date().getTime();
    const remainingTime = userSelectedDate.getTime() - currentTime;

    if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        datetimePicker.disabled = false;
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', () => {
    if (!userSelectedDate) {
        console.error("Пожалуйста, выберите дату перед запуском таймера.");
        return;
    }
    startButton.disabled = true;
    datetimePicker.disabled = true;
    updateTimer(); //
    countdownInterval = setInterval(updateTimer, 1000); 
});

flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: (selectedDates) => {
        userSelectedDate = selectedDates[0];
        const currentTime = new Date();
        
        if (userSelectedDate < currentTime) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
            });
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    }
});

function addLeadingZero(value) {
    return value < 10 ? '0' + value : value;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
}









