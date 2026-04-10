export default {
    id: 2,
    world: "archives",
    worldName: "Les Archives Perdues",
    title: "Sous-dossier caché",
    intro: "Le flag n'est plus dans le dossier courant. Il faut se déplacer.",
    course: { title: "Rappel Navigation", points: ["cd nom entre dans un dossier", "cd .. remonte d'un dossier", "pwd affiche le chemin actuel"] },
    type: "terminal",
    question: "Trouve le bon dossier, lis le flag, puis valide-le.",
    startPath: "/home/player",
    dirs: {
        "/home/player": ["notes.txt", "documents"],
        "/home/player/documents": ["flag.txt"]
    },
    files: {
        "/home/player/notes.txt": "Indice: regarde dans documents",
        "/home/player/documents/flag.txt": "FLAG{archives_2}"
    },
    answer: "FLAG{archives_2}",
    aliases: [],
    success: "Navigation réussie, flag trouvé.",
    fail: "Le flag saisi est incorrect.",
    explain: "Il fallait utiliser cd documents puis cat flag.txt."
};