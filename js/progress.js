"use strict";

/* =========================================
   R.I.S.E. — PROGRESS
   ========================================= */

const RISE_PROGRESS = {

    init() {

        this.updateStatistics();

        this.updateWeeklyProgress();

    },


    getWorkoutStatus() {

        const completed =
            localStorage.getItem(
                "riseWorkoutCompleted"
            ) === "true";

        return completed;

    },


    getRulesStatus() {

        const completed =
            Number(
                localStorage.getItem(
                    "riseRulesCompleted"
                )
            ) || 0;

        const total =
            Number(
                localStorage.getItem(
                    "riseRulesTotal"
                )
            ) || 0;

        return {
            completed,
            total
        };

    },


    updateStatistics() {

        const workoutCompleted =
            this.getWorkoutStatus();


        const rules =
            this.getRulesStatus();


        const totalWorkouts =
            workoutCompleted ? 1 : 0;


        const completedExercises =
            workoutCompleted ? 6 : 0;


        const completionRate =
            rules.total > 0
                ? Math.round(
                    (
                        rules.completed /
                        rules.total
                    ) * 100
                )
                : 0;


        const streak =
            workoutCompleted ? 1 : 0;


        this.setText(
            "totalWorkouts",
            totalWorkouts
        );


        this.setText(
            "currentStreak",
            streak
        );


        this.setText(
            "completedExercises",
            completedExercises
        );


        this.setText(
            "completionRate",
            `${completionRate}%`
        );

    },


    setText(id, value) {

        const element =
            document.getElementById(id);


        if (!element) {
            return;
        }


        element.textContent = value;

    },


    updateWeeklyProgress() {

        const workoutCompleted =
            this.getWorkoutStatus();


        const days =
            document.querySelectorAll(
                ".exercise-card"
            );


        if (!days.length) {
            return;
        }


        /*
         * Hozircha haftalik ko‘rinishda
         * birinchi kunni demo sifatida
         * yangilaymiz.
         *
         * Keyinchalik haqiqiy sana asosida
         * to‘liq history tizimini qo‘shamiz.
         */

        if (workoutCompleted && days[0]) {

            const status =
                days[0].querySelector(
                    ".exercise-time"
                );


            if (status) {

                status.textContent =
                    "Completed";

            }

        }

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        RISE_PROGRESS.init();

    }
);