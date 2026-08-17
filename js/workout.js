"use strict";

/* =========================================
   R.I.S.E. — WORKOUT CONTROLLER
   ========================================= */

const RISE_WORKOUT = {

    currentIndex: -1,

    exercises: [
        {
            name: "Warm-up",
            duration: 300,
            type: "warmup"
        },
        {
            name: "Push-ups",
            duration: 300,
            type: "exercise"
        },
        {
            name: "Rest",
            duration: 60,
            type: "rest"
        },
        {
            name: "Squats",
            duration: 300,
            type: "exercise"
        },
        {
            name: "Rest",
            duration: 60,
            type: "rest"
        },
        {
            name: "Plank",
            duration: 180,
            type: "exercise"
        },
        {
            name: "Rest",
            duration: 60,
            type: "rest"
        },
        {
            name: "Lunges",
            duration: 300,
            type: "exercise"
        },
        {
            name: "Rest",
            duration: 60,
            type: "rest"
        },
        {
            name: "Mountain Climbers",
            duration: 240,
            type: "exercise"
        },
        {
            name: "Rest",
            duration: 60,
            type: "rest"
        },
        {
            name: "Glute Bridge",
            duration: 240,
            type: "exercise"
        }
    ],


    elements: {
        start: null,
        pause: null,
        skip: null,
        finish: null
    },


    init() {

        this.elements.start =
            document.getElementById("startWorkoutButton");

        this.elements.pause =
            document.getElementById("pauseTimerButton");

        this.elements.skip =
            document.getElementById("skipTimerButton");

        this.elements.finish =
            document.getElementById("finishWorkoutButton");


        if (this.elements.start) {

            this.elements.start.addEventListener(
                "click",
                () => this.start()
            );

        }


        if (this.elements.pause) {

            this.elements.pause.addEventListener(
                "click",
                () => this.togglePause()
            );

        }


        if (this.elements.skip) {

            this.elements.skip.addEventListener(
                "click",
                () => this.next()
            );

        }


        if (this.elements.finish) {

            this.elements.finish.addEventListener(
                "click",
                () => this.finish()
            );

        }


        document.addEventListener(
            "riseTimerComplete",
            () => this.next()
        );


        document.addEventListener(
            "riseTimerSkipped",
            () => this.next()
        );

    },


    start() {

        if (this.currentIndex !== -1) {
            return;
        }

        this.currentIndex = 0;

        this.loadCurrent();

        RISE_TIMER.start(
            this.exercises[this.currentIndex].duration
        );

        this.setStartedState();

        localStorage.setItem(
            "riseWorkoutStarted",
            "true"
        );
    },


    loadCurrent() {

        const current =
            this.exercises[this.currentIndex];

        if (!current) {
            return;
        }

        RISE_TIMER.setExercise(
            current.name
        );

        this.updateExerciseHighlight();

    },


    next() {

        this.currentIndex++;

        if (
            this.currentIndex >=
            this.exercises.length
        ) {

            this.finish();

            return;
        }


        const current =
            this.exercises[this.currentIndex];


        this.loadCurrent();

        RISE_TIMER.start(
            current.duration
        );

    },


    togglePause() {

        if (RISE_TIMER.running) {

            RISE_TIMER.pause();

            if (this.elements.pause) {
                this.elements.pause.textContent =
                    "Resume";
            }

        } else {

            RISE_TIMER.resume();

            if (this.elements.pause) {
                this.elements.pause.textContent =
                    "Pause";
            }

        }

    },


    finish() {

        RISE_TIMER.stop();

        this.currentIndex = -1;

        localStorage.setItem(
            "riseWorkoutCompleted",
            "true"
        );

        localStorage.setItem(
            "riseLastWorkout",
            new Date().toISOString()
        );


        if (this.elements.pause) {
            this.elements.pause.textContent = "Pause";
        }


        const status =
            document.getElementById("timerStatus");

        const exercise =
            document.getElementById("currentExercise");


        if (status) {
            status.textContent = "COMPLETE";
        }

        if (exercise) {
            exercise.textContent =
                "Workout completed";
        }


        document.querySelectorAll(
            ".workout-exercise"
        ).forEach(card => {

            card.classList.add(
                "completed"
            );

        });


        this.updateExerciseHighlight();


        if (
            window.RISE &&
            typeof RISE.showNotification ===
            "function"
        ) {

            RISE.showNotification(
                "Workout completed. Keep rising!"
            );

        }

    },


    setStartedState() {

        if (!this.elements.start) {
            return;
        }

        this.elements.start.textContent =
            "Workout Running";

        this.elements.start.disabled = true;

    },


    updateExerciseHighlight() {

        const cards =
            document.querySelectorAll(
                ".workout-exercise"
            );


        cards.forEach(card => {
            card.classList.remove("current");
        });


        if (
            this.currentIndex < 1
        ) {
            return;
        }


        const exerciseIndex =
            this.currentIndex - 1;


        const currentCard =
            document.querySelector(
                `.workout-exercise[data-exercise="${exerciseIndex}"]`
            );


        if (currentCard) {

            currentCard.classList.add(
                "current"
            );

        }

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {
        RISE_WORKOUT.init();
    }
);