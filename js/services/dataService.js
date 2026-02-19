let passagesByDifficulty = null;
export async function loadPassages() {
    if (passagesByDifficulty) return passagesByDifficulty;

    try {
        const response = await fetch("./data.json");
        passagesByDifficulty = await response.json();
        if (!response.ok) throw new Error("Fail to load");
        return passagesByDifficulty;
    } catch (error) {
        console.error("Error loading passages:", error);
        passagesByDifficulty = {};
        return passagesByDifficulty;
    }
}

export function getRandomPassage(difficulty){
    if(!passagesByDifficulty) {
        console.warn("Passages not loaded yet");
        return null;
    }

    const list = passagesByDifficulty[difficulty];

    if (!list || list.length === 0){
        console.warn(`No passages for difficulty: ${difficulty}`);
        return null;
    }

    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}