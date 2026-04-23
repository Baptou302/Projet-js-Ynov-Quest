export default {
    id: 3,
    world: "sql",
    worldName: "La Base Centrale",
    title: "Ajouter des données",
    intro: "La table users existe déjà. Il faut ajouter un utilisateur.",
    courseKey: "data",
    type: "text",
    question: "Écris une requête valide pour insérer Alice avec l'id 1.",
    answer: "insert into users values (1, 'alice');",
    aliases: [
        'insert into users values (1, "alice");',
        "insert into users values (1,'alice');"
    ],
    success: "La ligne a été ajoutée.",
    fail: "La requête d'insertion n'est pas reconnue.",
    explain: "INSERT INTO ajoute une ligne dans une table."
};