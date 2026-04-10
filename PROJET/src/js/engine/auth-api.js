const API = "http://localhost:3000";

const fetch$ = (path, data) =>
    fetch(`${API}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(r => r.json());

export const login = (email, password) => fetch$("/login", { email, password });
export const register = (pseudo, firstname, lastname, email, password) =>
    fetch$("/register", { pseudo, firstname, lastname, email, password });

