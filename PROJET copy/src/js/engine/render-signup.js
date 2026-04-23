function renderSignup() {
    return `
        <section class="auth-screen center stack">
            <div class="card">
                <h2>Créer un compte</h2>

                <input type="text" id="pseudo" placeholder="Pseudo">
                <input type="text" id="email" placeholder="Email">
                <input type="password" id="password" placeholder="Mot de passe">
                <input type="password" id="confirmPassword" placeholder="Confirmer le mot de passe">

                <button class="btn" data-action="doSignup">S'inscrire</button>
                
                <p>Vous avez un compte ? <a href="#" data-action="goLogin">Se connecter</a></p>
            </div>
        </section>
    `;
}

export default renderSignup;
