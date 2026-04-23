function renderResult(result) {
    const title = result?.ok ? "Bonne réponse" : "Mauvaise réponse";
    const message = result?.message || "Résultat indisponible.";
    const explain = result?.explain || "Aucune explication disponible.";

    return `
        <section class="screen stack center">
            <h1>${title}</h1>
            <p>${message}</p>

            <div class="card">
                <p>${explain}</p>
            </div>

            <div class="row" style="justify-content:center">
                ${result?.ok
                    ? `<button class="btn" data-action="next">Niveau suivant</button>`
                    : `<button class="btn" data-action="retry">Réessayer</button>`}
                <button class="btn secondary" data-action="backHome">Menu</button>
            </div>
        </section>
    `;
}

export default renderResult;