export const state = {
    status: "idle",
    // idle, running, finished

    ui: {
        screen: "home",
        //home, typing, completed, baseline, newRecord
    },

    user: {
        personalBest: null, //number WPM
        hasBaseline: false
    },
    
    settings: {
        difficulty: "easy", //easy, medium, hard
        mode: "timed", //timed, passage
        timeLimit: 60
    },

    passage: {
        text: "",
        difficulty: "" //easy, medium, hard
    },

    typing: {
        input: "",
        currentIndex: 0,    // cursor position
        errors: 0,          // total errors (even corrected ones)
        correctChars: 0,
        pendingErrors: 0
    },

    timer: {
        time: 0,
        isRunning: false
    },

    results: {
        wpm: 0,
        accuracy: 0,
        correct: 0,
        incorrect: 0
    }
};

// state mutation functions

//status and ui

export function setStatus(newStatus){
    state.status = newStatus;
}

export function setScreen(screenName){
    state.ui.screen = screenName;
}

export function setDifficulty(level){
    state.settings.difficulty = level;
}

export function setMode(mode){
    state.settings.mode = mode;
}

//passage

export function setPassage(text, difficulty){
    state.passage.text = text;
    state.passage.difficulty = difficulty;
}

//typing

export function resetTyping(){
    state.typing.input = "";
    state.typing.currentIndex = 0;
    state.typing.errors = 0;
    state.typing.correctChars = 0;
    state.typing.pendingErrors = 0;
}

export function updateTyping(inputLength, isCorrect){
    state.typing.currentIndex = inputLength;

    if (isCorrect) {
        state.typing.correctChars++;
    } else {
        state.typing.errors++;
        state.typing.pendingErrors++;
    }
}

//timer

export function startTimer(startValue = 0) {
    state.timer.time = startValue;
    state.timer.isRunning = true;
}

export function stopTimer() {
    state.timer.isRunning = false;
}

export function tickTimer(value = 1){
    state.timer.time += value;
}

//results

export function setResults({wpm, accuracy, correct, incorrect}) {
    state.results.wpm = wpm;
    state.results.accuracy = accuracy;
    state.results.correct = correct;
    state.results.incorrect = incorrect;
}

// full reset

export function resetTestState(){
    setStatus("idle");
    setScreen("home");
    resetTyping();
    stopTimer();
    state.timer.time = 0;
    state.results = {
        wpm: 0,
        accuracy: 0,
        correct: 0,
        incorrect: 0
    };
}