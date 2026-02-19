import { state } from "../state.js";
export function render(){
    renderScreen();
    renderPassage();
    renderStats();
    renderResults();
}

function renderScreen(){
    const screens = document.querySelectorAll("[data-screen]");

    screens.forEach(screen => {
        const screensAllowed = screen.dataset.screen.split(" ");

        if (screensAllowed.includes(state.ui.screen)) {
            screen.hidden = false;
        } else {
            screen.hidden = true;
        }
    });

}

function renderPassage() {
  const container = document.getElementById("text-display");
  if (!container) return;

  const text  = state.passage.text;
  const input = state.typing.input;

  container.innerHTML = "";

  for (let i = 0; i < text.length; i++) {
    const span        = document.createElement("span");
    const expected    = text[i];
    const typed       = input[i];

    span.className = "char";
    span.textContent = expected;

    if (typed == null) {
    } else if (typed === expected) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
    }

    if (i === state.typing.currentIndex) {
      span.classList.add("cursor");
    }

    container.appendChild(span);
  }
}

function renderStats() {
  const timeEl     = document.getElementById("time-current");
  const wpmEl      = document.getElementById("wpm-current");
  const accuracyEl = document.getElementById("accuracy-current");
  const pbEl       = document.getElementById("personal-best");

  if (timeEl)     timeEl.textContent     = state.timer.time;
  if (wpmEl)      wpmEl.textContent      = state.results.wpm;
  if (accuracyEl) accuracyEl.textContent = `${state.results.accuracy}%`;
  if (pbEl)       pbEl.textContent       = state.user.personalBest || 0;
}

function renderResults() {
  const screen = state.ui.screen;
  if (!["completed", "baseline", "newRecord"].includes(screen)) return;

  const activeSection = document.querySelector(`[data-screen="${screen}"]`);
  if (!activeSection) return;

  const wpmEl      = activeSection.querySelector(".wpm__baseline");
  const accuracyEl = activeSection.querySelector(".accuracy__baseline");
  const correctEl  = activeSection.querySelector(".c__characters");
  const incorrectEl = activeSection.querySelector(".i__characters");

  if (wpmEl)       wpmEl.textContent       = state.results.wpm;
  if (accuracyEl)  accuracyEl.textContent  = `${state.results.accuracy}%`;
  if (correctEl)   correctEl.textContent   = state.results.correct;
  if (incorrectEl) incorrectEl.textContent = state.results.incorrect;
}
