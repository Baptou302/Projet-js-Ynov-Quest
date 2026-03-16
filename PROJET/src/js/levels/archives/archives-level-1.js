export default {
    id: 1,
    world: "archives",
    worldName: "Les Archives Perdues",
    title: "Premier terminal",
    intro: "Explore le terminal, trouve le flag puis entre-le dans le champ de validation.",
    courseKey: "files",
    type: "terminal",
    question: "Lis le fichier flag.txt pour récupérer le flag.",
    startPath: "/home/player",
    dirs: {
        "/home/player": ["flag.txt"]
    },
    files: {
        "/home/player/flag.txt": "FLAG{archives_1}"
    },
    answer: "FLAG{archives_1}",
    aliases: [],
    success: "Tu as trouvé le premier flag.",
    fail: "Ce n'est pas le bon flag.",
    explain: "Tu devais utiliser ls pour voir le fichier puis cat flag.txt pour le lire."
};