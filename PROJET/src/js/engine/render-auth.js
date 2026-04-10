export const renderAuth = () => {
    const isLogin = window.authMode === "login";
    const title = isLogin ? "Connexion" : "Inscription";
    const inputs = isLogin 
        ? `<input id="e" type="email" class="input" placeholder="Email">
           <input id="p" type="password" class="input" placeholder="Mot de passe">`
        : `<input id="ps" type="text" class="input" placeholder="Pseudo">
           <input id="f" type="text" class="input" placeholder="Prénom">
           <input id="l" type="text" class="input" placeholder="Nom">
           <input id="e" type="email" class="input" placeholder="Email">
           <input id="p" type="password" class="input" placeholder="Mot de passe">
           <input id="c" type="password" class="input" placeholder="Confirmer">`;
    const button = isLogin ? "Connexion" : "Créer";
    const link = isLogin ? `<a data-action="showRegister" style="color:#2563eb;cursor:pointer">Créer un compte</a>` : `<a data-action="showAuth" style="color:#2563eb;cursor:pointer">Déjà un compte?</a>`;
    const action = isLogin ? "auth" : "register";
    return `<section class="screen center stack auth-form">
        <h2>${title}</h2>${inputs}
        <button class="btn" data-action="${action}" style="width:100%">${button}</button>
        <p style="text-align:center;font-size:12px">${link}</p>
    </section>`;
};
