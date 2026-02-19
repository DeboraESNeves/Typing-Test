export function calculateWPM(correctChars, time){
    if (time === 0) return 0;

    const minutes = time / 60;
    const words = correctChars / 5;

    return Math.round(words / minutes);
}

export function calculateAccuracy(correctChars, errors) {
    const totalTyped = correctChars + errors;

    if (totalTyped === 0) return 100;

    return Math.round((correctChars / totalTyped) * 100);
}

export function calculateMetrics({
    correctChars,
    errors,
    time
}) {
    const wpm = calculateWPM(correctChars, time);
    const accuracy = calculateAccuracy(correctChars, errors);

    return{
        wpm,
        accuracy,
        correct: correctChars,
        incorrect: errors
    };
}