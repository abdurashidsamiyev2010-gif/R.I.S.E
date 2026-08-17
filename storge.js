/* =========================================
   R.I.S.E. — STORAGE SYSTEM
   ========================================= */

const RISE_STORAGE_KEY = "rise_app_data";

const defaultRiseData = {
    progress: {
        completedWorkouts: 0,
        completedExercises: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalMinutes: 0
    },

    workouts: {},

    penalties: [],

    rules: {},

    settings: {
        theme: "dark",
        notifications: true
    }
};


/* =========================================
   GET DATA
   ========================================= */

function getRiseData() {
    try {
        const savedData = localStorage.getItem(RISE_STORAGE_KEY);

        if (!savedData) {
            saveRiseData(defaultRiseData);
            return structuredClone(defaultRiseData);
        }

        const parsedData = JSON.parse(savedData);

        return {
            ...structuredClone(defaultRiseData),
            ...parsedData,
            progress: {
                ...defaultRiseData.progress,
                ...(parsedData.progress || {})
            },
            settings: {
                ...defaultRiseData.settings,
                ...(parsedData.settings || {})
            }
        };

    } catch (error) {
        console.error("R.I.S.E. storage error:", error);

        return structuredClone(defaultRiseData);
    }
}


/* =========================================
   SAVE DATA
   ========================================= */

function saveRiseData(data) {
    try {
        localStorage.setItem(
            RISE_STORAGE_KEY,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {
        console.error("R.I.S.E. save error:", error);

        return false;
    }
}


/* =========================================
   UPDATE DATA
   ========================================= */

function updateRiseData(updates) {

    const currentData = getRiseData();

    const updatedData = {
        ...currentData,
        ...updates
    };

    saveRiseData(updatedData);

    return updatedData;
}


/* =========================================
   UPDATE PROGRESS
   ========================================= */

function updateProgress(progressUpdates) {

    const data = getRiseData();

    data.progress = {
        ...data.progress,
        ...progressUpdates
    };

    saveRiseData(data);

    return data.progress;
}


/* =========================================
   COMPLETE WORKOUT
   ========================================= */

function completeWorkout(date, workoutData = {}) {

    const data = getRiseData();

    data.workouts[date] = {
        completed: true,
        exercises: workoutData.exercises || 0,
        minutes: workoutData.minutes || 0,
        completedAt: new Date().toISOString()
    };

    data.progress.completedWorkouts += 1;

    data.progress.completedExercises +=
        workoutData.exercises || 0;

    data.progress.totalMinutes +=
        workoutData.minutes || 0;

    saveRiseData(data);

    return data;
}


/* =========================================
   GET WORKOUT
   ========================================= */

function getWorkout(date) {

    const data = getRiseData();

    return data.workouts[date] || null;
}


/* =========================================
   ADD PENALTY
   ========================================= */

function addPenalty(penalty) {

    const data = getRiseData();

    data.penalties.push({
        id: Date.now(),
        title: penalty.title || "Penalty",
        reason: penalty.reason || "",
        date: penalty.date || new Date().toISOString(),
        completed: false
    });

    saveRiseData(data);

    return data.penalties;
}


/* =========================================
   COMPLETE PENALTY
   ========================================= */

function completePenalty(id) {

    const data = getRiseData();

    const penalty = data.penalties.find(
        item => item.id === id
    );

    if (penalty) {
        penalty.completed = true;
    }

    saveRiseData(data);

    return penalty;
}


/* =========================================
   GET PENALTIES
   ========================================= */

function getPenalties() {

    const data = getRiseData();

    return data.penalties;
}


/* =========================================
   SETTINGS
   ========================================= */

function updateSettings(settings) {

    const data = getRiseData();

    data.settings = {
        ...data.settings,
        ...settings
    };

    saveRiseData(data);

    return data.settings;
}


function getSettings() {

    const data = getRiseData();

    return data.settings;
}


/* =========================================
   RESET ALL DATA
   ========================================= */

function resetRiseData() {

    const confirmation = confirm(
        "Are you sure you want to reset all R.I.S.E. data?"
    );

    if (!confirmation) {
        return false;
    }

    localStorage.removeItem(RISE_STORAGE_KEY);

    window.location.reload();

    return true;
}


/* =========================================
   EXPORT DATA
   ========================================= */

function exportRiseData() {

    const data = getRiseData();

    const dataString = JSON.stringify(
        data,
        null,
        2
    );

    const blob = new Blob(
        [dataString],
        {
            type: "application/json"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        `rise-backup-${new Date().toISOString().split("T")[0]}.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
}


/* =========================================
   INITIALIZE STORAGE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const data = getRiseData();

    console.log("R.I.S.E. storage initialized:", data);

});