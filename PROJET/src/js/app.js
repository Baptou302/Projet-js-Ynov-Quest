import state from "./state.js";
import worlds from "./worlds.js";
import archivesData from "./data/archives-data.js";
import networkData from "./data/network-data.js";
import sqlData from "./data/sql-data.js";
import renderHome from "./engine/render-home.js";
import renderWorld from "./engine/render-world.js";
import renderLevel from "./engine/render-level.js";
import renderResult from "./engine/render-result.js";
import renderLogin from "./engine/render-login.js";
import renderSignup from "./engine/render-signup.js";
import checkAnswer from "./engine/check-answer.js";

const dataMap = { archives: archivesData, network: networkData, sql: sqlData };

export function startApp() {
    renderApp();
}

export function renderApp() {
    const app = document.getElementById("app");

    if (state.screen === "login") app.innerHTML = renderLogin();
    if (state.screen === "signup") app.innerHTML = renderSignup();
    if (state.screen === "home") app.innerHTML = renderHome();
    if (state.screen === "worlds") app.innerHTML = renderWorld(worlds);
    if (state.screen === "level") app.innerHTML = renderLevel(getLevel());
    if (state.screen === "result") app.innerHTML = renderResult(state.result);

    bindActions();
}

function bindActions() {
    document.querySelectorAll("[data-action]").forEach(btn => {
        btn.onclick = () => actions[btn.dataset.action]?.(btn.dataset.value);
    });
}

const actions = {
    goLogin: () => go("login"),
    goSignup: () => go("signup"),
    doLogin: () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Identifiants incorrects.");
            return;
        }

        localStorage.setItem("loggedUser", JSON.stringify({ pseudo: user.pseudo, email }));
        go("home");
    },
    doSignup: () => {
        const pseudo = document.getElementById("pseudo").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!pseudo || !email || !password || !confirmPassword) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(u => u.email === email)) {
            alert("Un compte existe déjà avec cet email.");
            return;
        }

        users.push({ pseudo, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Compte créé avec succès !");
        go("login");
    },
    logout: () => {
        localStorage.removeItem("loggedUser");
        go("login");
    },
    start: () => go("worlds"),
    backHome: () => go("home"),
    selectWorld: id => {
        state.world = id;
        state.levelIndex = 0;
        go("level");
    },
    submit: () => {
        state.result = checkAnswer(getLevel());
        go("result");
    },
    retry: () => go("level"),
    next: () => {
        state.levelIndex += 1;
        state.result = null;

        if (state.levelIndex >= dataMap[state.world].length) {
            state.levelIndex = 0;
            state.world = null;
            go("worlds");
            return;
        }

        go("level");
    }
};

function getLevel() {
    return dataMap[state.world][state.levelIndex];
}

function go(screen) {
    state.screen = screen;
    renderApp();
}