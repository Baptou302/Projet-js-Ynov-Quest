export default {
    id: 4,
    world: "archives",
    worldName: "Les Archives Perdues",
    title: "Terminal final",
    intro: "Aucune aide ne sera donnée.",
    course: { title: "Rappel Navigation", points: ["cd nom entre dans un dossier", "cd .. remonte d'un dossier", "pwd affiche le chemin actuel"] },
    type: "terminal",
    question: "Récupère le flag.",
    startPath: "/home/player",

    dirs: {
        "/home/player": ["notes", "tmp", ".hidden"],
        "/home/player/notes": ["readme.txt"],
        "/home/player/tmp": ["cache.txt"],
        "/home/player/.hidden": ["token.txt"],
        "/root": ["secure"],
        "/root/secure": ["flag.txt"]
    },

    files: {
        "/home/player/notes/readme.txt": "nothing useful here",
        "/home/player/tmp/cache.txt": "temporary file",
        "/home/player/.hidden/token.txt": "L3Jvb3Qvc2VjdXJlL2ZsYWcudHh0",
        "/root/secure/flag.txt": "FLAG{archives_final}"
    },

    protectedFiles: [
        "/root/secure/flag.txt"
    ],

    answer: "FLAG{archives_final}",
    aliases: [],
    success: "Flag validé.",
    fail: "Flag incorrect.",
    explain: "Challenge terminé."
};