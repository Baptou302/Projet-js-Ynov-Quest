const express = require("express"), bcrypt = require("bcryptjs"), mysql = require("mysql2/promise");
const app = express(), pool = mysql.createPool({ host: "localhost", user: "root", password: "", database: "yquest", connectionLimit: 10 });

app.use(express.json());
app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Content-Type"); next(); });

const query = (sql, params) => pool.getConnection().then(c => c.query(sql, params).then(r => (c.release(), r)));

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await query("SELECT id, pseudo, password_hash FROM users WHERE email = ?", [email]);
        const ok = users.length && bcrypt.compareSync(password, users[0].password_hash);
        res.json(ok ? { success: true, userId: users[0].id, firstname: users[0].pseudo } : { success: false, message: "Erreur" });
    } catch (e) { res.json({ success: false, message: "Erreur serveur" }); }
});

app.post("/register", async (req, res) => {
    try {
        const { pseudo, firstname, lastname, email, password } = req.body;
        const hash = bcrypt.hashSync(password, 10);
        const [result] = await query("INSERT INTO users (pseudo, firstname, lastname, email, password_hash) VALUES (?, ?, ?, ?, ?)", [pseudo, firstname, lastname, email, hash]);
        res.json({ success: true, userId: result.insertId });
    } catch (e) {
        const msg = e.code === "ER_DUP_ENTRY" ? "Email ou pseudo déjà utilisé" : "Erreur serveur";
        res.json({ success: false, message: msg });
    }
});

app.listen(3000, () => console.log("✓ Serveur sur http://localhost:3000"));
