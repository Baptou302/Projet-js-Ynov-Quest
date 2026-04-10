import state from "../state.js";

export default () => {
    const userBtn = state.user
        ? `<span style="font-size:12px;color:#9ca3af">Bonjour ${state.user.pseudo}</span>&nbsp;<button class="btn secondary" data-action="logout" style="padding:6px 12px;font-size:12px">Déco</button>`
        : `<button class="btn" data-action="showAuth" style="padding:6px 12px;font-size:12px">Connexion</button>`;
    return `<section class="screen center stack">
        <div style="position:absolute;top:12px;right:12px">${userBtn}</div>
        <span class="badge">Projet JS</span><h1>Ynov Quest</h1><p>Révisions Linux, Réseau et SQL</p>
        <button class="btn" data-action="start">Commencer</button>
    </section>`;
};