import courses from "../data/courses.js";
import { enableQcmPick } from "./helpers.js";
import initTerminal from "./terminal.js";

const types = {
    terminal: () => `<div class="card stack"><h3>Terminal</h3><div id="terminal-history" class="terminal-history"></div><div class="row"><input id="terminal-input" class="input" placeholder="Tape une commande"><button id="terminal-run" class="btn">Exécuter</button></div></div><div class="card stack"><h3>Validation du flag</h3><input id="flag-answer" class="input" placeholder="Entre le flag trouvé"><button class="btn" data-action="submit">Valider le flag</button></div>`,
    qcm: level => level.options.map(o => `<button class="btn secondary option" data-answer="${o}">${o}</button>`).join('') + '<button class="btn" data-action="submit">Valider</button>',
    text: () => `<input id="answer" class="input" placeholder="Ta réponse ici"><button class="btn" data-action="submit">Valider</button>`
};

function renderLevel(level) {
    const course = courses[level.world][level.courseKey];
    setTimeout(() => {
        if (level.type === "qcm") enableQcmPick();
        if (level.type === "terminal") initTerminal(level);
    }, 0);
    
    return `<section class="screen stack">
        <span class="badge">${level.worldName} - Niveau ${level.id}</span>
        <h2>${level.title}</h2>
        <p>${level.intro}</p>
        <div class="card stack"><h3>${course.title}</h3><ul>${course.points.map(p => `<li>${p}</li>`).join('')}</ul></div>
        <div class="stack"><h3>Défi</h3><p>${level.question}</p>${types[level.type](level)}</div>
        <button class="btn secondary" data-action="backHome">Menu</button>
    </section>`;
}

export default renderLevel;
