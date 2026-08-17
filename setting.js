"use strict";

/* =========================================
   R.I.S.E. — SETTINGS
   ========================================= */

const RISE_SETTINGS = {

    keys: {
        notifications: "riseNotifications",
        reminders: "riseReminders",
        sound: "riseSound",
        autoStart: "riseAutoStart"
    },


    init() {

        this.loadSettings();
        this.bindEvents();

    },


    loadSettings() {

        const defaults = {
            notifications: true,
            reminders: true,
            sound: true,
            autoStart: true
        };


        Object.entries(defaults).forEach(
            ([name, defaultValue]) => {

                const key = this.keys[name];

                const saved =
                    localStorage.getItem(key);


                const value =
                    saved === null
                        ? defaultValue
                        : saved === "true";


                const element =
                    document.getElementById(
                        `${name}Toggle`
                    );


                if (element) {
                    element.checked = value;
                }

            }
        );

    },


    bindEvents() {

        Object.entries(this.keys).forEach(
            ([name, key]) => {

                const element =
                    document.getElementById(
                        `${name}Toggle`
                    );


                if (!element) {
                    return;
                }


                element.addEventListener(
                    "change",
                    () => {

                        localStorage.setItem(
                            key,
                            String(element.checked)
                        );

                    }
                );

            }
        );


        const resetButton =
            document.getElementById(
                "resetDataButton"
            );


        if (resetButton) {

            resetButton.addEventListener(
                "click",
                () => this.resetData()
            );

        }


        const exportButton =
            document.getElementById(
                "exportDataButton"
            );


        if (exportButton) {

            exportButton.addEventListener(
                "click",
                () => this.exportData()
            );

        }

    },


    resetData() {

        const confirmed =
            window.confirm(
                "Reset all R.I.S.E. data from this browser?"
            );


        if (!confirmed) {
            return;
        }


        Object.values(this.keys).forEach(
            key => {
                localStorage.removeItem(key);
            }
        );


        localStorage.removeItem(
            "riseDailyRules"
        );

        localStorage.removeItem(
            "riseRulesCompleted"
        );

        localStorage.removeItem(
            "riseRulesTotal"
        );

        localStorage.removeItem(
            "riseWorkoutStarted"
        );

        localStorage.removeItem(
            "riseWorkoutCompleted"
        );

        localStorage.removeItem(
            "riseLastWorkout"
        );


        window.location.reload();

    },


    exportData() {

        const data = {};

        for (
            let i = 0;
            i < localStorage.length;
            i++
        ) {

            const key =
                localStorage.key(i);

            if (
                key &&
                key.startsWith("rise")
            ) {

                data[key] =
                    localStorage.getItem(key);

            }

        }


        const json =
            JSON.stringify(
                data,
                null,
                2
            );


        const blob =
            new Blob(
                [json],
                {
                    type: "application/json"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "rise-data.json";


        document.body.appendChild(link);

        link.click();

        link.remove();


        URL.revokeObjectURL(url);

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        RISE_SETTINGS.init();

    }
);