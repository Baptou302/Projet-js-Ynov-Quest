# Ynov Quest

Ynov Quest est un jeu éducatif web qui enseigne des notions que l'on a vue en cours — terminal Linux, réseaux, et bases de données SQL — à travers des défis interactifs et une progression par niveaux.

---

## Présentation

Le joueur se connecte, choisit un monde, et résout des challenges pour avancer. Chaque niveau propose une mise en contexte narrative, un cours condensé, puis une épreuve pratique avec feedback immédiat.

Le projet tourne sur un serveur Express (Node.js) pour la gestion des utilisateurs, le reste de la logique (jeu, niveaux, rendu) étant entièrement côté client en JavaScript.

---

## Les trois mondes

| Monde | Thème | Niveaux |
|---|---|---|
| Les Archives Perdues | Terminal Linux | 4 niveaux |
| La Zone Réseau | Réseaux / IP | 4 niveaux |
| La Base Centrale | SQL | 4 niveaux |

### Les Archives Perdues — Terminal Linux
Navigation dans un système de fichiers simulé. Le joueur tape de vraies commandes (`ls`, `cat`, `cd`, `sudo`, `ls -a`) dans un terminal émulé pour trouver des flags cachés dans des fichiers et répertoires.

### La Zone Réseau — Réseaux
Questions sur l'adressage IPv4, la notation CIDR, les masques réseau et le routage. Format QCM ou saisie libre.

### La Base Centrale — SQL
Challenges sur la création de bases de données (`CREATE DATABASE`, `CREATE TABLE`), l'insertion (`INSERT`) et la consultation (`SELECT`) de données. Format QCM ou saisie libre.

---

## Fonctionnalités clés

### Émulateur de terminal
- Système de fichiers virtuel avec répertoires et fichiers configurables par niveau
- Commandes supportées : `help`, `pwd`, `ls`, `ls -a`, `cd`, `cat`, `sudo -l`, `sudo cat`, `clear`
- Gestion des permissions de fichiers, navigation par chemin relatif/absolu
- Historique de commandes affiché dans l'interface

### Système de niveaux
Trois types de challenge :
- **terminal** — le joueur interagit avec le terminal simulé pour trouver un flag
- **text** — saisie d'une réponse courte (commande, valeur, mot-clé)
- **qcm** — choix multiple avec une seule bonne réponse

Chaque niveau contient : intro narrative, cours (points clés), question, validation de réponse avec explication, et écran succès/échec avec relance ou passage au niveau suivant.

### Authentification utilisateur
- Inscription (pseudo, prénom, nom, email, mot de passe)
- Connexion avec vérification par email
- Mots de passe hashés avec bcryptjs
- Données stockées en MySQL (base `yquest`, table `users`)

### Interface et navigation
- Navigation entre écrans : accueil → sélection de monde → niveau → résultat
- Transitions avec effet "warp"
- Musique de fond par monde, avec contrôle de son
- Thème CSS distinct par monde

---

## Stack technique

**Backend**
- Node.js + Express
- MySQL2 (pool de connexions)
- bcryptjs (hachage des mots de passe)
- CORS

**Frontend**
- JavaScript ES6 Modules (vanilla, sans framework)
- HTML5 / CSS3
- Web Audio API (musique de fond)

**Base de données**
- MySQL — base `yquest`, table `users`

---

## Structure du projet

```
PROJET/
├── index.html
├── server.js               # Serveur Express 
├── package.json
├── assets/
│   └── images/             # Visuels des mondes
└── src/
    ├── css/
    │   ├── style.css
    │   ├── layout.css
    │   ├── components.css
    │   └── worlds.css
    └── js/
        ├── main.js          # Point d'entrée
        ├── app.js           # Contrôleur principal & état
        ├── state.js         # État global
        ├── worlds.js        # Définition des mondes
        ├── data/
        │   └── levels.js    # Import et organisation des niveaux
        ├── levels/
        │   ├── archives/    # 4 niveaux terminal Linux
        │   ├── network/     # 4 niveaux réseaux
        │   └── sql/         # 4 niveaux SQL
        └── engine/
            ├── auth-api.js
            ├── render-auth.js
            ├── render-home.js
            ├── render-world.js
            ├── render-level.js
            ├── render-result.js
            ├── check-answer.js
            ├── terminal.js
            ├── music.js
            └── helpers.js
```

---

## Installation et lancement

**Prérequis**
- Node.js installé
- MySQL en cours d'exécution (port 3306 par défaut)
- Base de données `yquest` créée avec la table `users`

```sql
CREATE DATABASE yquest;
USE yquest;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(50) NOT NULL,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
```

**Démarrage**

```bash
cd PROJET
npm install
npm start
```

Le serveur tourne sur `http://localhost:3000`. Ouvrir `index.html` dans un navigateur (ou via un serveur statique local).

---

## Comprendre les dépendances

### Pourquoi `npm install` ?

Quand tu récupères ce projet (ex: par `git clone`), seul `package.json` est inclus. Il contient la **liste** des dépendances nécessaires (Express, bcryptjs, MySQL2, etc.), mais pas les packages eux-mêmes.

`npm install` télécharge tous les packages listés dans `package.json` et les place dans le dossier `node_modules/`.

### Le dossier `node_modules/`

- Contient tous les packages npm instalés et leurs dépendances
- **Très lourd** (souvent 100+ MB) — **ne pas commit sur Git**
- Généré automatiquement par `npm install`
- Si tu le supprimes accidentellement, il suffit de relancer `npm install`

### `package-lock.json`

- **Verrouille les versions exactes** de tous les packages installés
- Créé automatiquement par `npm install`
- Assure que tout le monde utilise les mêmes versions (reproduction garantie)
- **À commit sur Git** — c'est le "snapshot" de tes dépendances
- Permet à quelqu'un d'autre de cloner le projet et d'avoir exactement the même environnement

### `npm start` — Pourquoi ?

`npm start` lance le serveur vérifie le `package.json` et exécute le script `start` (par défaut : `node server.js`).

**À quoi ça sert :**
- Lance **Express** écoute sur le port 3000
- Démarre les routes `/login` et `/register`
- Permet au frontend de communiquer avec la base de données

**Sans `npm start`**, tu n'as qu'une page statique HTML — pas d'authentification, pas de sauvegarde de scores, rien !

**Résumé**
| Fichier/Dossier | Rôle |
|---|---|
| `package.json` | Liste des dépendances + script `start` |
| `package-lock.json` | Versions exactes (reproducibilité) |
| `node_modules/` | Les packages téléchargés (généré par `npm install`) |
| `npm start` | Lance le serveur pour que l'app fonctionne |

## Auteurs

Réalisé par Erwann Sueur, Baptiste Lecoq et théo Delourneau