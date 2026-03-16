import renderCourse from "./render-course.js";
import archivesCourse from "../courses/archives-course.js";
import networkCourse from "../courses/network-course.js";
import sqlCourse from "../courses/sql-course.js";
import { enableQcmPick } from "./helpers.js";
import initTerminal from "./terminal.js";

const courseMap = {
    archives: archivesCourse,
    network: networkCourse,
    sql: sqlCourse
};

function renderTextInput() {
    return `
        <input id="answer" class="input" placeholder="Ta réponse ici">
        <button class="btn" data-action="submit">Valider</button>
    `;
}

function renderQcm(level) {
    return `
        ${level.options.map(option => `
            <button class="btn secondary option" data-answer="${option}">
                ${option}
            </button>
        `).join("")}
        <button class="btn" data-action="submit">Valider</button>
    `;
}

function renderTerminal() {
    return `
        <div class="card stack">
            <h3>Terminal</h3>
            <div id="terminal-history" class="terminal-history"></div>
            <div class="row">
                <input id="terminal-input" class="input" placeholder="Tape une commande">
                <button id="terminal-run" class="btn">Exécuter</button>
            </div>
        </div>

        <div class="card stack">
            <h3>Validation du flag</h3>
            <input id="flag-answer" class="input" placeholder="Entre le flag trouvé">
            <button class="btn" data-action="submit">Valider le flag</button>
        </div>
    `;
}

function renderChallenge(level) {
    if (level.type === "terminal") return renderTerminal();
    if (level.type === "qcm") return renderQcm(level);
    return renderTextInput();
}

function renderLevel(level) {
    const course = courseMap[level.world][level.courseKey];

    setTimeout(() => {
        if (level.type === "qcm") enableQcmPick();
        if (level.type === "terminal") initTerminal(level);
    }, 0);

    return `
        <section class="screen stack">
            <span class="badge">${level.worldName} - Niveau ${level.id}</span>
            <h2>${level.title}</h2>
            <p>${level.intro}</p>
            ${renderCourse(course)}
            <div class="stack">
                <h3>Défi</h3>
                <p>${level.question}</p>
                ${renderChallenge(level)}
            </div>
            <button class="btn secondary" data-action="backHome">Menu</button>
        </section>
    `;
}

export default renderLevel;