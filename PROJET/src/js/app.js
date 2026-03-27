import state from "./state.js";
import worlds from "./worlds.js";
import levels from "./data/levels.js";
import renderHome from "./engine/render-home.js";
import renderWorld from "./engine/render-world.js";
import renderLevel from "./engine/render-level.js";
import renderResult from "./engine/render-result.js";
import checkAnswer from "./engine/check-answer.js";

const go = screen => (state.screen = screen, renderApp());
const getLevel = () => levels[state.world][state.levelIndex];

const actions = {
    start: () => go("worlds"),
    backHome: () => go("home"),
    selectWorld: id => { state.world = id; state.levelIndex = 0; go("level"); },
    submit: () => { state.result = checkAnswer(getLevel()); go("result"); },
    retry: () => go("level"),
    next: () => {
        state.levelIndex++;
        state.result = null;
        if (state.levelIndex >= levels[state.world].length) {
            state.levelIndex = 0;
            state.world = null;
            go("worlds");
        } else go("level");
    }
};

export function startApp() { renderApp(); }

export function renderApp() {
    const app = document.getElementById("app");
    if (state.screen === "home") app.innerHTML = renderHome();
    else if (state.screen === "worlds") app.innerHTML = renderWorld(worlds);
    else if (state.screen === "level") app.innerHTML = renderLevel(getLevel());
    else if (state.screen === "result") app.innerHTML = renderResult(state.result);
    document.querySelectorAll("[data-action]").forEach(btn => {
        btn.onclick = () => actions[btn.dataset.action]?.(btn.dataset.value);
    });
}