export default {
    id: 4,
    world: "sql",
    worldName: "La Base Centrale",
    title: "Filtrer les résultats",
    intro: "Le client veut afficher seulement les utilisateurs du service reseau.",
    courseKey: "data",
    type: "text",
    question: "Quelle requête SELECT avec WHERE peux-tu écrire ?",
    answer: "select * from users where service = 'reseau';",
    aliases: [
        'select * from users where service="reseau";',
        "select * from users where service='reseau';"
    ],
    success: "La requête de filtrage est correcte.",
    fail: "La requête ne filtre pas correctement.",
    explain: "WHERE sert à filtrer les lignes selon une condition."
};