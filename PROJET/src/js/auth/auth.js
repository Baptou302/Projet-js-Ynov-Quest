function signup() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Vérifier si l'utilisateur existe déjà
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        alert("Un compte existe déjà avec cet email.");
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Compte créé avec succès !");
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Identifiants incorrects.");
        return;
    }

    localStorage.setItem("loggedUser", email);
    window.location.href = "index.html"; // redirection vers le jeu
}

function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}