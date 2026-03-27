import { normalize } from "./helpers.js";

function getValue(level) {
    return level.type === "terminal" ? (document.getElementById("flag-answer")?.value || "") : 
           level.type === "qcm" ? (document.querySelector("[data-answer].picked")?.dataset.answer || "") :
           (document.getElementById("answer")?.value || "");
}

export default function checkAnswer(level) {
    const value = normalize(getValue(level));
    const answers = [level.answer, ...(level.aliases || [])].map(normalize);
    const ok = answers.includes(value);
    return {
        ok,
        message: ok ? (level.success || "Bonne réponse.") : (level.fail || "Mauvaise réponse."),
        explain: level.explain || "Aucune explication disponible."
    };
}