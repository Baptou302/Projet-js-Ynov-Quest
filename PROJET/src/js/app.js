import state from "./state.js";
import worlds from "./worlds.js";
import levels from "./data/levels.js";
import renderHome from "./engine/render-home.js";
import renderWorld from "./engine/render-world.js";
import renderLevel from "./engine/render-level.js";
import renderResult from "./engine/render-result.js";
import { renderAuth } from "./engine/render-auth.js";
import checkAnswer from "./engine/check-answer.js";
import { login, register } from "./engine/auth-api.js";
import { playMusic, stopMusic } from "./engine/music.js";

const go = s => (state.screen = s, renderApp());
const getLevel = () => levels[state.world][state.levelIndex];
const warp = (f, d = 1000) => (document.getElementById("warp-overlay").classList.add("active"), setTimeout(f, d), setTimeout(() => document.getElementById("warp-overlay").classList.remove("active"), 2000));

const getVal = id => document.getElementById(id)?.value || "";
const checkFields = (...ids) => ids.every(id => getVal(id)) || (alert("Remplir tous les champs"), false);

const actions = {
    start: () => (stopMusic(), go("worlds")),
    backHome: () => warp(() => (stopMusic(), go("home"))),
    selectWorld: id => warp(() => (state.world = id, state.levelIndex = 0, playMusic(id), go("level"))),
    submit: () => (state.result = checkAnswer(getLevel()), go("result")),
    retry: () => warp(() => go("level")),
    next: () => warp(() => {
        state.levelIndex++;
        state.result = null;
        go(state.levelIndex >= levels[state.world].length ? (stopMusic(), state.world = null, "worlds") : "level");
    }),
    showAuth: () => (stopMusic(), window.authMode = "login", go("auth")),
    showRegister: () => (stopMusic(), window.authMode = "register", go("auth")),
    auth: async () => {
        const res = await login(getVal("e"), getVal("p"));
        res.success ? (state.user = { id: res.userId, pseudo: res.firstname }, stopMusic(), go("home")) : alert(res.message);
    },
    register: async () => {
        const [ps, f, l, e, p, c] = ["ps", "f", "l", "e", "p", "c"].map(getVal);
        if (!checkFields("ps", "f", "l", "e", "p", "c") || (p !== c && alert("Mots de passe différents"))) return;
        const res = await register(ps, f, l, e, p);
        res.success ? (state.user = { id: res.userId, pseudo: ps }, stopMusic(), go("home")) : alert(res.message);
    },
    logout: () => (state.user = null, stopMusic(), go("home"))
};

const renders = { home: renderHome, auth: renderAuth, worlds: () => renderWorld(worlds), level: () => renderLevel(getLevel()), result: () => renderResult(state.result) };

export const startApp = () => renderApp();

export function renderApp() {
    const app = document.getElementById("app");
    app.innerHTML = renders[state.screen]();
    app.className = ((state.screen === "level" || state.screen === "result") ? worlds.find(w => w.id === state.world)?.theme : "") || "";
    document.querySelectorAll("[data-action]").forEach(btn => btn.onclick = () => actions[btn.dataset.action]?.(btn.dataset.value));
}