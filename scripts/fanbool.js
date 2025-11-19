/*
    Student Name: Aaron Blum
    File Name: fanbool.js
    Date: 11/8/2025
*/

const cutoffThisWeek = new Date("2025-11-23T17:00:00Z").getTime();

function onTimer() {
    const durationMs = cutoffThisWeek - Date.now();
    if (durationMs > 0) {
        updateTimer(durationMs / 1000);
        enableForm();
    } else {
        document.getElementById("countdown-display").textContent = "PREDICTIONS LOCKED";
    }
}

const secondsInDay = 60 * 60 * 24;
const secondsInHour = 60 * 60;
const secondsInMinute = 60;

// Render the countdown timer.
function updateTimer(seconds) {
    const days = Math.floor(seconds / secondsInDay);
    seconds -= days * secondsInDay;
    const hours = Math.floor(seconds / secondsInHour);
    seconds -= hours * secondsInHour;
    const minutes = Math.floor(seconds / secondsInMinute);
    seconds -= minutes * secondsInMinute;
    seconds = Math.floor(seconds);

    document.getElementById("countdown-display").textContent = "PICK NOW! within " +
        days + "d : " +
        hours + "h : " +
        minutes + "m : " +
        seconds + "s.";
}

// Enable all the prediction controls.
function enableForm() {
    const elements = document.getElementsByTagName('input');
    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = false;
    }
}

// Function to handle the Falcons horn sound
function setupAudioHandler() {
    const falconHorn = document.getElementById('falconHorn');
    const falconImg = document.getElementById('falconImg');
    falconImg.addEventListener('click', function () {
        if (falconHorn.paused) {
            falconHorn.play();
        } else {
            falconHorn.pause();
            falconHorn.currentTime = 0;
        }
    });
}

// Start everything when the file loads
document.addEventListener('DOMContentLoaded', function () {
    setupAudioHandler();
    onTimer(); // render immediately
    window.setInterval(onTimer, 1000); // recompute countdown every second
});
