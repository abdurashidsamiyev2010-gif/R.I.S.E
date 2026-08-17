"use strict";

/* =========================================
   R.I.S.E. — RULES
   ========================================= */

const RISE_RULES = {

    storageKey: "riseDailyRules",

    checkboxes: [],
    counter: null,


    init() {

        this.checkboxes =
            document.querySelectorAll(
                ".rule-checkbox"
            );

        this.counter =
            document.getElementById(
                "rulesCompleted"
            );


        if (!this.checkboxes.length) {
            return;
        }


        this.load();


        this.checkboxes.forEach(
            (checkbox, index) => {

                checkbox.addEventListener(
                    "change",
                    () => {

                        this.save();

                        this.updateCounter();

                        this.updateCard(
                            checkbox
                        );

                    }
                );

            }
        );


        this.updateCounter();

        this.checkboxes.forEach(
            checkbox => {
                this.updateCard(checkbox);
            }
        );

    },


    load() {

        const saved =
            localStorage.getItem(
                this.storageKey
            );


        if (!saved) {
            return;
        }


        try {

            const rules =
                JSON.parse(saved);


            this.checkboxes.forEach(
                (checkbox, index) => {

                    checkbox.checked =
                        Boolean(rules[index]);

                }
            );

        } catch (error) {

            console.error(
                "R.I.S.E. rules data could not be loaded.",
                error
            );

        }

    },


    save() {

        const rules =
            Array.from(
                this.checkboxes
            ).map(
                checkbox =>
                    checkbox.checked
            );


        localStorage.setItem(
            this.storageKey,
            JSON.stringify(rules)
        );

    },


    updateCounter() {

        if (!this.counter) {
            return;
        }


        const completed =
            Array.from(
                this.checkboxes
            ).filter(
                checkbox =>
                    checkbox.checked
            ).length;


        this.counter.textContent =
            `${completed} / ${this.checkboxes.length}`;


        localStorage.setItem(
            "riseRulesCompleted",
            String(completed)
        );


        localStorage.setItem(
            "riseRulesTotal",
            String(this.checkboxes.length)
        );

    },


    updateCard(checkbox) {

        const card =
            checkbox.closest(
                ".rule-card"
            );


        if (!card) {
            return;
        }


        card.classList.toggle(
            "completed",
            checkbox.checked
        );

    },


    getCompletedCount() {

        return Array.from(
            this.checkboxes
        ).filter(
            checkbox =>
                checkbox.checked
        ).length;

    },


    getTotalCount() {

        return this.checkboxes.length;

    },


    isComplete() {

        return (
            this.getTotalCount() > 0 &&
            this.getCompletedCount() ===
            this.getTotalCount()
        );

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        RISE_RULES.init();

    }
);