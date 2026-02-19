import { loadPersonalBest } from "./services/storageService.js";
import { loadPassages } from "./services/dataService.js";
import { render } from "./ui/render.js";
import "./ui/events.js";

async function initApp() {
    loadPersonalBest();
    
    await loadPassages(); 
    
    render();
    console.log("App pronto e dados carregados!");
}

initApp();