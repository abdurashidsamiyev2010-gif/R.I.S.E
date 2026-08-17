"use strict";

/* =========================================
   R.I.S.E. — TIMER
   ========================================= */

const RISE_TIMER = {

    interval: null,
    seconds: 300,
    running: false,

    elements: {
        timer: null,
        status: null,
        exercise: null
    },


    init() {

        this.elements.timer =
            document.getElementById("workoutTimer");

        this.elements.status =
            document.getElementById("timerStatus");

        this.elements.exercise =
            document.getElementById("currentExercise");

        if (!this.elements.timer) {
            return;
        }

        this.updateDisplay();
    },


    start(seconds = 300) {

        this.stop();

        this.seconds = seconds;
        this.running = true;

        this.setStatus("RUNNING");

        this.interval = setInterval(() => {

            if (this.seconds <= 0) {

                this.stop();

                this.setStatus("COMPLETE");

                document.dispatchEvent(
                    new CustomEvent("riseTimerComplete")
                );

                return;
            }

            this.seconds--;

            this.updateDisplay();

        }, 1000);

        this.updateDisplay();
    },


    pause() {

        if (!this.running) {
            return;
        }

        clearInterval(this.interval);

        this.interval = null;
        this.running = false;

        this.setStatus("PAUSED");
    },


    resume() {

        if (this.running || this.seconds <= 0) {
            return;
        }

        this.running = true;

        this.setStatus("RUNNING");

        this.interval = setInterval(() => {

            if (this.seconds <= 0) {

                this.stop();

                this.setStatus("COMPLETE");

                document.dispatchEvent(
                    new CustomEvent("riseTimerComplete")
                );

                return;
            }

            this.seconds--;

            this.updateDisplay();

        }, 1000);
    },


    stop() {

        clearInterval(this.interval);

        this.interval = null;
        this.running = false;

    },


    reset(seconds = 300) {

        this.stop();

        this.seconds = seconds;

        this.setStatus("READY");

        this.updateDisplay();
    },


    skip() {

        this.stop();

        this.seconds = 0;

        this.updateDisplay();

        this.setStatus("SKIPPED");

        document.dispatchEvent(
            new CustomEvent("riseTimerSkipped")
        );
    },


    setStatus(status) {

        if (!this.elements.status) {
            return;
        }

        this.elements.status.textContent = status;
    },


    setExercise(name) {

        if (!this.elements.exercise) {
            return;
        }

        this.elements.exercise.textContent = name;
    },


    updateDisplay() {

        if (!this.elements.timer) {
            return;
        }

        const minutes =
            Math.floor(this.seconds / 60);

        const seconds =
            this.seconds % 60;

        this.elements.timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {
        RISE_TIMER.init();
    }
);