const PERSONAL_BEST_KEY = "typing_personal_best";
export function loadPersonalBest() {
    const stored = localStorage.getItem(PERSONAL_BEST_KEY);
    if (!stored) return null;
    const value = Number(stored);
    return Number.isNaN(value) ? null : value;
}

export function getPersonalBest(){
    const stored = localStorage.getItem(PERSONAL_BEST_KEY);
    if (!stored) return null;
    const value = Number(stored);
    return Number.isNaN(value) ? null : value;
}

export function setPersonalBest(wpm) {
    if (typeof wpm !== "number") return;
    localStorage.setItem(PERSONAL_BEST_KEY, wpm.toString()); 
}

export function updatePersonalBestIfNeeded(currentWpm) {
  const storedBest = getPersonalBest();

  if (storedBest === null || currentWpm > storedBest) {
    setPersonalBest(currentWpm);
    return true;
  }
  return false;
}

export function hasBaseline() {
  return getPersonalBest() !== null;
}
