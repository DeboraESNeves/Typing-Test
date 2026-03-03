import { state, setScreen, setDifficulty, setMode, resetTestState } from "../state.js";
import { getRandomPassage } from "../services/dataService.js";
import { processTyping } from "../services/typingService.js";
import { startTimer, stopTimer } from "../services/timerService.js";
import { calculateMetrics } from "../services/metricsService.js";
import { updatePersonalBestIfNeeded, hasBaseline } from "../services/storageService.js";
import { render } from "./render.js";
import { showConfetti } from "./feedback.js";

console.log("events.js carregado!");

const startBtn         = document.getElementById("start-btn");
const gameContainer    = document.getElementById("game-container");
const restartButtons   = document.querySelectorAll(".goagain__button, .restart__button");
const difficultySelect = document.getElementById("difficulty");
const modeSelect       = document.getElementById("mode");
const difficultyButtons = document.querySelectorAll("#difficulty__buttons button");
const modeButtons       = document.querySelectorAll("#mode-buttons button");

difficultyButtons.forEach(button => {
  button.addEventListener("click", () => {
    setDifficulty(button.value);
    difficultyButtons.forEach(b => b.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");

    if (state.ui.screen === "typing") {
      startTest();
    }
  });
});

modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    setMode(button.value);
    modeButtons.forEach(b => b.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
  });

  if (state.ui.screen === "typing") {
      startTest();
    }
});

difficultySelect.addEventListener("change", () => {
  setDifficulty(difficultySelect.value);
  
  if (state.ui.screen === "typing") {
    startTest();
  }
});

modeSelect.addEventListener("change", () => {
  setMode(modeSelect.value);
  
  if (state.ui.screen === "typing") {
    startTest();
  }
});

if (startBtn) {
  startBtn.addEventListener("click", startTest);
} else {
  console.error("ERRO: #start-btn não encontrado!");
}

restartButtons.forEach(btn => {
  console.log("Botão registrado:", btn.textContent.trim());
  btn.addEventListener("click", startTest);
});

function handleKeydown(event) {
  if (event.key === "Backspace" || event.key === " ") {
    event.preventDefault();
  }

  if (state.status === "idle" && event.key.length === 1) {
    state.status = "running";

    if (state.settings.mode === "timed") {
      startTimer({
        startTime: 60,
        direction: "down",
        onTick: render,
        onFinish: finishTest
      });
    } else {
      startTimer({
        startTime: 0,
        direction: "up",
        onTick: render
      });
    }
  }

  if (state.status !== "running") return;

  processTyping(event);

  const elapsedTime = state.settings.mode === "timed"
    ? state.settings.timeLimit - state.timer.time
    : state.timer.time;

  if (elapsedTime > 0) {
    state.results = calculateMetrics({
      correctChars: state.typing.correctChars,
      errors:       state.typing.errors,
      time:         elapsedTime,
    });
  }

  render();
  console.log("currentIndex:", state.typing.currentIndex, "textLength:", state.passage.text.length);

  if (
    state.typing.currentIndex >= state.passage.text.length &&
    state.typing.pendingErrors === 0
  ) {
    finishTest();
  }
}

function startTest() {
  console.log("startTest chamando");

  stopTimer();
  
  gameContainer.removeEventListener("keydown", handleKeydown);

  resetTestState();

  const passage = getRandomPassage(state.settings.difficulty);

  if (!passage) {
    alert("Passages are being loaded. Try again later.");
    return;
  }

  state.passage.text       = passage.text;
  state.passage.difficulty = state.settings.difficulty;
  state.status             = "idle";

  setScreen("typing");
  render();
  gameContainer.addEventListener("keydown", handleKeydown);
  gameContainer.focus();
}

function finishTest() {
  stopTimer();
  gameContainer.removeEventListener("keydown", handleKeydown);

  const elapsedTime = state.settings.mode === "timed" 
  ? state.settings.timeLimit - state.timer.time 
  : state.timer.time;

  const metrics = calculateMetrics({
    correctChars: state.typing.correctChars,
    errors:       state.typing.errors,
    time:         elapsedTime,
  });

  state.results = metrics;

  const isFirstTest = !hasBaseline();
  const isNewRecord = updatePersonalBestIfNeeded(metrics.wpm);

  if (isFirstTest) {
    setScreen("baseline");
  } else if (isNewRecord) {
    setScreen("newRecord");
    showConfetti();
  } else {
    setScreen("completed");
  }

  render();
}