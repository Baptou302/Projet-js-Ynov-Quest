function renderLogin() {
    return `
        <section class="auth-screen center stack">
            <div class="card">
                <h2>Connexion</h2>

                <input type="text" id="email" placeholder="Email">
                <input type="password" id="password" placeholder="Mot de passe">

                <button class="btn" data-action="doLogin">Se connecter</button>
                
                <p>Pas encore inscrit ? <a href="#" data-action="goSignup">S'inscrire</a></p>
            </div>
        </section>
    `;
}

export default renderLogin;
