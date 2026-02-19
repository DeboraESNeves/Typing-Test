import { state } from "../state.js";

export function showPersonalBest(isNewRecord) {
    const pbContainer = document.querySelector(".header__content__persBest p");
    if (!pbContainer) return;

    if (isNewRecord) {
        pbContainer.classList.add("new-record");
    } else {
        pbContainer.classList.remove("new-record");
    }
}


export function showBaselineMessage() {
    const section = document.querySelector(".home__baseline");
    if (!section) return;

    section.hidden = false;
}

export function showConfetti() {
    const container = document.querySelector(".home__score-smashed");
    if (!container) return;

    container.classList.add("confetti");
}

export function resetFeedback() {
    const spans = document.querySelectorAll("#text-display span");
    spans.forEach(span => {
        span.classList.remove("correct", "incorrect", "cursor");
    });

    const pbContainer = document.querySelector(".header__content__persBest p");
    pbContainer?.classList.remove("new-record");

    const scoreScreen = document.querySelector(".home__score-smashed");
    scoreScreen?.classList.remove("confetti");
}
