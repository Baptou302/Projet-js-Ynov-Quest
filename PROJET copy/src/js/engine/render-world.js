function renderWorld(worlds) {
    return `
        <section class="screen stack center">
            <h1>Choisir un monde</h1>
            <div class="world-list">
                ${worlds.map(world => `
                    <article class="world-card" data-action="selectWorld" data-value="${world.id}">
                        <div class="world-circle ${world.id}">
                            <img src="${world.image}" alt="${world.name}">
                        </div>
                        <h3>${world.name}</h3>
                    </article>
                `).join("")}
            </div>
            <div>
                <button class="btn secondary" data-action="backHome">Retour</button>
            </div>
        </section>
    `;
}

export default renderWorld;