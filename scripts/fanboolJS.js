/*
    Student Name: Aaron Blum
    File Name: fanboolJS.js
    Date: 11/8/2025
*/

// Put this entire block in your external .js file or inside a <script> tag.
function startCountdownTimer() {
    const submitButton = document.getElementById("submit");
    const picksForm = document.getElementById("picks");

    // All these variables (constants) are now local to the startCountdownTimer function,
    // preventing them from interfering with other functions you define later.

    // 1. Define the Target Time (New Year 2026, 00:00 EST / 05:00 UTC)
    const targetTimeMs = new Date("2025-11-09T13:30:00Z").getTime();

    // Target element for output
    const displayElement = document.getElementById("countdown-display");

    // Check if the display element exists before starting the timer
    if (!displayElement) {
        console.error("Error: Could not find element with ID 'countdown-display'.");
        return; // Stop the function if the element isn't found
    }

    // Start the timer, running the function every 1 millisecond
    const timerInterval = setInterval(function () {

        // 2. Get the Current Time (Updates every millisecond)
        const currentTimeMs = new Date().getTime();

        // 3. Calculate the Remaining Distance in milliseconds
        const distanceMs = targetTimeMs - currentTimeMs;

        // --- NEW: Time Conversion Logic ---

        // Calculate Days (Divide total milliseconds by milliseconds in a day)
        const days = Math.floor(distanceMs / (1000 * 60 * 60 * 24));

        // Calculate Hours (Use the remainder after days, and divide by milliseconds in an hour)
        const hours = Math.floor((distanceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        // Calculate Minutes (Use the remainder after hours, and divide by milliseconds in a minute)
        const minutes = Math.floor((distanceMs % (1000 * 60 * 60)) / (1000 * 60));

        // Calculate Seconds (Use the remainder after minutes, and divide by milliseconds in a second)
        const seconds = Math.floor((distanceMs % (1000 * 60)) / 1000);
        // --- END: Time Conversion Logic ---


        // 4. Display the Formatted Result
        if (distanceMs > 0) {
            displayElement.innerHTML =
                days + "d : " +
                hours + "h : " +
                minutes + "m : " +
                seconds + "s";
        } else {
            // 5. Stop the Timer when done
            clearInterval(timerInterval);
            displayElement.innerHTML = "COUNTDOWN FINISHED!";

            // --- GUARANTEED BUTTON HIDE ---
            if (submitButton) {
                // 1. Force the 'display: none' rule using !important
                //    This overrides ALL other CSS display rules for this element.
                submitButton.style.cssText = 'display: none !important; margin: 0 !important;';

                // 2. Disable the button functionality
                submitButton.disabled = true;

                // --- NEW: Hide the <hr> element that is right after the button ---
                // Since the <hr> is a sibling, we need to hide it separately.
                let hrElement = submitButton.nextElementSibling;
                if (hrElement && hrElement.tagName === 'HR') {
                    hrElement.style.display = 'none';
                }
            }

            // 3. Prevent form submission (as a robust backup)
            if (picksForm) {
                picksForm.addEventListener('submit', function (event) {
                    event.preventDefault();
                });
            }

            // Get the entire form element
            const formPicks = document.getElementById("picks");

            if (formPicks) {
                // Select all <input> and <select> elements within the form
                const formInputs = formPicks.querySelectorAll('input, select, textarea');

                // Loop through the list and disable each one
                formInputs.forEach(input => {
                    // We ensure we don't disable other elements if they are present, 
                    // though for your current form structure, this is safe.
                    input.disabled = true;
                });
            }
        }
    }, 1000); // Interval is set to 1 millisecond
}

//Function to handle the Falcons horn sound
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

//Start everything when the file loads
setupAudioHandler();