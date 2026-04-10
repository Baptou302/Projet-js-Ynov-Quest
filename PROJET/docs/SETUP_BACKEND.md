## Setup Backend

1. **Installer les dépendances:**
```bash
npm install
```

2. **Configurer la BD** dans `server.js`:
   - `host`: localhost
   - `user`: root
   - `password`: (votre mot de passe MySQL)
   - `database`: ynov_quest

3. **Lancer le serveur:**
```bash
npm start
```

L'API sera sur `http://localhost:3000`

## Endpoints

- `POST /api/auth/login` - Connexion (email, password)
- `POST /api/auth/register` - Inscription (firstname, lastname, email, password)
- `POST /api/progress` - Sauver progression (user_id, world, level_id, completed)
