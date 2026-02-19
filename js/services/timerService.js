import { state } from "../state.js";
let intervalId = null;

export function startTimer({
    startTime = 0,
    direction = "up",
    onTick,
    onFinish,
}) {
    stopTimer();

    state.timer.time = startTime;

    intervalId = setInterval(() => { 
    if (direction === "down") {
        state.timer.time--; 
    } else {
        state.timer.time++;
    }

    if (onTick) onTick(state.timer.time);

    if (direction === "down" && state.timer.time <= 0) {
        stopTimer();
        if (onFinish) onFinish();
    }

  }, 1000);
}

export function stopTimer(){
    if(intervalId !== null){
        clearInterval(intervalId);
        intervalId = null
    }
}

export function resetTimer(){
    stopTimer();
    state.timer.time = 0;
}