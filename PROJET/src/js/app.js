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

const go = s => (state.screen = s, renderApp());
const getLevel = () => levels[state.world][state.levelIndex];

const getVal = id => document.getElementById(id)?.value || "";
const checkFields = (...ids) => ids.every(id => getVal(id)) || (alert("Remplir tous les champs"), false);

const actions = {
    start: () => go("worlds"),
    backHome: () => go("home"),
    selectWorld: id => (state.world = id, state.levelIndex = 0, go("level")),
    submit: () => (state.result = checkAnswer(getLevel()), go("result")),
    retry: () => go("level"),
    next: () => {
        state.levelIndex++;
        state.result = null;
        go(state.levelIndex >= levels[state.world].length ? (state.world = null, "worlds") : "level");
    },
    showAuth: () => (window.authMode = "login", go("auth")),
    showRegister: () => (window.authMode = "register", go("auth")),
    auth: async () => {
        const res = await login(getVal("e"), getVal("p"));
        res.success ? (state.user = { id: res.userId, pseudo: res.firstname }, go("home")) : alert(res.message);
    },
    register: async () => {
        const [ps, f, l, e, p, c] = ["ps", "f", "l", "e", "p", "c"].map(getVal);
        if (!checkFields("ps", "f", "l", "e", "p", "c") || (p !== c && alert("Mots de passe différents"))) return;
        const res = await register(ps, f, l, e, p);
        res.success ? (state.user = { id: res.userId, pseudo: ps }, go("home")) : alert(res.message);
    },
    logout: () => (state.user = null, go("home"))
};

const renders = { home: renderHome, auth: renderAuth, worlds: () => renderWorld(worlds), level: () => renderLevel(getLevel()), result: () => renderResult(state.result) };

export const startApp = () => renderApp();

export function renderApp() {
    document.getElementById("app").innerHTML = renders[state.screen]();
    document.querySelectorAll("[data-action]").forEach(btn => btn.onclick = () => actions[btn.dataset.action]?.(btn.dataset.value));
}