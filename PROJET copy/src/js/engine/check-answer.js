import { normalize } from "./helpers.js";

function getValue(level) {
    if (level.type === "terminal") {
        return document.getElementById("flag-answer")?.value || "";
    }

    if (level.type === "qcm") {
        const picked = document.querySelector("[data-answer].picked");
        return picked ? picked.dataset.answer : "";
    }

    return document.getElementById("answer")?.value || "";
}

function checkAnswer(level) {
    const value = normalize(getValue(level));
    const answers = [level.answer, ...(level.aliases || [])].map(normalize);
    const ok = answers.includes(value);

    return {
        ok: ok,
        message: ok
            ? (level.success || "Bonne réponse.")
            : (level.fail || "Mauvaise réponse."),
        explain: level.explain || "Aucune explication disponible."
    };
}

export default checkAnswer;