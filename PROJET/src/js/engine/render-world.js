function renderWorld(worlds) {
    return `<section class="screen stack center">
  <h1>Choisir un monde</h1>
  <div class="world-list">
    ${worlds.map(w => `<article class="world-card" data-action="selectWorld" data-value="${w.id}">
      <div class="world-circle ${w.id}">
        <img src="${w.image}" alt="${w.name}">
      </div>
      <h3>${w.name}</h3>
    </article>`).join('')}
  </div>
  <div>
    <button class="btn secondary" data-action="backHome">Retour</button>
  </div>
</section>`;
}

export default renderWorld;