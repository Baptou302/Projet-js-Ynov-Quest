function renderHome() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");

    return `
        <header class="top-right-actions">
            ${loggedUser ? `<span>Salut ${loggedUser.pseudo}</span> <button class="btn" data-action="logout">Déconnexion</button>` : `<button class="btn" data-action="goLogin">Se connecter</button>`}
        </header>
        <section class="screen center stack">
            <span class="badge">Projet JS / HTML / CSS</span>
            <h1>Ynov Quest</h1>
            <p>
                Un jeu pour réviser Linux, Réseau et SQL
                à travers 3 mondes progressifs.
            </p>
            <div>
                <button class="btn" data-action="start">Commencer</button>
                ${loggedUser ? `<p style="margin-top: 20px; font-size: 14px;">Connecté en tant que: <strong>${loggedUser.pseudo}</strong></p>` : ''}
            </div>
        </section>
    `;
}

export default renderHome;