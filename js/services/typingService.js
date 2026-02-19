import { state, updateTyping } from "../state.js";

export function processTyping(event) {
  const key = event.key;
  const text = state.passage.text;
  const currentIndex = state.typing.currentIndex;

  if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab",
       "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key)) return;

  if (key === "Backspace") {
    if (currentIndex === 0) return;

    state.typing.input = state.typing.input.slice(0, -1);
    state.typing.currentIndex = state.typing.input.length;
    return;
  }

  if (currentIndex >= text.length) return;

  if (key.length === 1) {
    const expected = text[currentIndex];
    const isCorrect = key === expected;

    state.typing.input += key;

    updateTyping(state.typing.input.length, isCorrect);
  }
}