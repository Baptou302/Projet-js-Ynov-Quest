export default {
    id: 3,
    world: "archives",
    worldName: "Les Archives Perdues",

    title: "Dossier caché",

    intro: "Le flag est caché dans un dossier invisible. Certaines commandes peuvent afficher les fichiers cachés.",

    courseKey: "navigation",

    type: "terminal",

    question: "Trouve le dossier caché, récupère le flag et valide-le.",

    startPath: "/home/player",

    dirs: {

        "/home/player": [
            "desktop",
            "downloads",
            ".secrets"
        ],

        "/home/player/desktop": [
            "todo.txt"
        ],

        "/home/player/downloads": [
            "music.txt"
        ],

        "/home/player/.secrets": [
            "private"
        ],

        "/home/player/.secrets/private": [
            "flag.txt"
        ]
    },

    files: {

        "/home/player/desktop/todo.txt":
            "Rien ici",

        "/home/player/downloads/music.txt":
            "Toujours rien",

        "/home/player/.secrets/private/flag.txt":
            "FLAG{archives_3}"
    },

    answer: "FLAG{archives_3}",

    aliases: [],

    success: "Tu as trouvé le dossier caché.",

    fail: "Le flag est incorrect.",

    explain:
        "Le dossier .secrets était caché, il fallait utiliser ls -a pour le voir."
};