import { state } from "../state.js";
let intervalId = null;

function formatTime(seconds) {
    const absSeconds = Math.abs(seconds);
    const minutes = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    const formattedSecs = secs.toString().padStart(2, '0');
    
    return seconds < 0 ? `-${minutes}:${formattedSecs}` : `${minutes}:${formattedSecs}`;
}

export function startTimer({
    startTime = 0,
    direction = "up",
    onTick,
    onFinish,
}) {
    stopTimer();

    state.timer.time = startTime;
    state.timer.formatted = formatTime(startTime);

    intervalId = setInterval(() => { 
    if (direction === "down") {
        state.timer.time--; 
    } else {
        state.timer.time++;
    }

    state.timer.formatted = formatTime(state.timer.time);

     if (onTick) onTick();

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
    state.timer.formatted = "0:00"
}

export { formatTime };