/* =========================================
   R.I.S.E. — APP.JS
   Main Application
   ========================================= */

"use strict";


/* =========================================
   R.I.S.E. APPLICATION
   ========================================= */

const RISE = {

    /* -----------------------------------------
       Application State
       ----------------------------------------- */

    state: {
        currentPage: "dashboard",
        selectedDay: null,
        workoutStarted: false,
        workoutCompleted: false
    },


    /* -----------------------------------------
       Initialize Application
       ----------------------------------------- */

    init() {

        this.detectCurrentPage();
        this.setupNavigation();
        this.setupButtons();
        this.updateDate();
        this.loadStoredData();

        console.log("R.I.S.E. initialized successfully.");
    },


    /* -----------------------------------------
       Detect Current Page
       ----------------------------------------- */

    detectCurrentPage() {

        const path = window.location.pathname;

        if (
            path.includes("schedule")
        ) {
            this.state.currentPage = "schedule";

        } else if (
            path.includes("exercises")
        ) {
            this.state.currentPage = "exercises";

        } else if (
            path.includes("workout")
        ) {
            this.state.currentPage = "workout";

        } else if (
            path.includes("progress")
        ) {
            this.state.currentPage = "progress";

        } else if (
            path.includes("rules")
        ) {
            this.state.currentPage = "rules";

        } else if (
            path.includes("penalties")
        ) {
            this.state.currentPage = "penalties";

        } else if (
            path.includes("settings")
        ) {
            this.state.currentPage = "settings";

        } else {
            this.state.currentPage = "dashboard";
        }
    },


    /* -----------------------------------------
       Navigation
       ----------------------------------------- */

    setupNavigation() {

        const navigationLinks =
            document.querySelectorAll(".nav-item");

        navigationLinks.forEach(link => {

            link.addEventListener("click", () => {

                navigationLinks.forEach(item => {
                    item.classList.remove("active");
                });

                link.classList.add("active");
            });

        });
    },


    /* -----------------------------------------
       Buttons
       ----------------------------------------- */

    setupButtons() {

        const startButton =
            document.querySelector(".primary-button");

        if (startButton) {

            startButton.addEventListener("click", () => {

                this.state.workoutStarted = true;

                this.saveData();

            });

        }


        const notificationButton =
            document.querySelector(".icon-button");

        if (notificationButton) {

            notificationButton.addEventListener("click", () => {

                this.showNotification(
                    "No new notifications."
                );

            });

        }

    },


    /* -----------------------------------------
       Current Date
       ----------------------------------------- */

    updateDate() {

        const dateElement =
            document.querySelector("[data-current-date]");

        if (!dateElement) {
            return;
        }

        const now = new Date();

        const options = {
            weekday: "long",
            month: "long",
            day: "numeric"
        };

        dateElement.textContent =
            now.toLocaleDateString(
                "en-US",
                options
            );
    },


    /* -----------------------------------------
       Local Storage
       ----------------------------------------- */

    saveData() {

        try {

            localStorage.setItem(
                "riseState",
                JSON.stringify(this.state)
            );

        } catch (error) {

            console.error(
                "R.I.S.E. could not save data:",
                error
            );

        }

    },


    loadStoredData() {

        try {

            const savedData =
                localStorage.getItem("riseState");

            if (!savedData) {
                return;
            }

            const parsedData =
                JSON.parse(savedData);

            this.state = {
                ...this.state,
                ...parsedData
            };

        } catch (error) {

            console.error(
                "R.I.S.E. could not load saved data:",
                error
            );

        }

    },


    /* -----------------------------------------
       Notification
       ----------------------------------------- */

    showNotification(message) {

        const existing =
            document.querySelector(".rise-notification");

        if (existing) {
            existing.remove();
        }


        const notification =
            document.createElement("div");

        notification.className =
            "rise-notification";

        notification.textContent =
            message;


        document.body.appendChild(
            notification
        );


        setTimeout(() => {

            notification.classList.add(
                "show"
            );

        }, 10);


        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 2500);
    },


    /* -----------------------------------------
       Utility
       ----------------------------------------- */

    getToday() {

        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        return days[
            new Date().getDay()
        ];
    }

};


/* =========================================
   Start Application
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        RISE.init();
    }
);