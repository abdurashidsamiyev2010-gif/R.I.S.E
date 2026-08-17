"use strict";

/* =========================================
   R.I.S.E. — PENALTIES
   ========================================= */

const RISE_PENALTIES = {

    init() {

        this.updateStats();

    },


    getRulesData() {

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


    updateStats() {

        const {
            completed,
            total
        } = this.getRulesData();


        const missed =
            Math.max(
                total - completed,
                0
            );


        const missedElement =
            document.getElementById(
                "missedRules"
            );

        const activeElement =
            document.getElementById(
                "activePenalties"
            );

        const completedElement =
            document.getElementById(
                "completedPenalties"
            );

        const statusElement =
            document.getElementById(
                "penaltyStatus"
            );


        if (missedElement) {

            missedElement.textContent =
                missed;

        }


        /*
         * Hozircha faol jarima soni
         * bajarilmagan majburiyatlar soniga
         * teng hisoblanadi.
         */

        if (activeElement) {

            activeElement.textContent =
                missed;

        }


        if (completedElement) {

            completedElement.textContent =
                0;

        }


        if (statusElement) {

            statusElement.textContent =
                missed === 0
                    ? "CLEAR"
                    : "ACTIVE";

        }


        this.updateEmptyState(
            missed
        );

    },


    updateEmptyState(missed) {

        const emptyState =
            document.getElementById(
                "penaltyEmptyState"
            );


        if (!emptyState) {
            return;
        }


        if (missed === 0) {

            emptyState.innerHTML = `

                <span class="stat-label">
                    NO ACTIVE PENALTIES
                </span>

                <strong>
                    Stay consistent.
                </strong>

                <span class="stat-description">
                    Complete your daily commitments
                    to keep this section clear.
                </span>

            `;

            return;

        }


        emptyState.innerHTML = `

            <span class="stat-label">
                ACTIVE PENALTIES
            </span>

            <strong>
                ${missed} commitment${missed === 1 ? "" : "s"} missed.
            </strong>

            <span class="stat-description">
                Review your daily commitments and
                return to your routine.
            </span>

        `;

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        RISE_PENALTIES.init();

    }
);