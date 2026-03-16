export default {
    id: 2,
    world: "sql",
    worldName: "La Base Centrale",
    title: "Créer une table users",
    intro: "Le client veut une table users avec id, nom et email.",
    courseKey: "create",
    type: "qcm",
    question: "Choisis la bonne requête.",
    options: [
        "CREATE TABLE users (id INT, nom VARCHAR(50), email VARCHAR(100));",
        "INSERT TABLE users (id, nom, email);",
        "CREATE DATABASE users (id, nom, email);"
    ],
    answer: "create table users (id int, nom varchar(50), email varchar(100));",
    aliases: [],
    success: "La table users est correcte.",
    fail: "Ce script ne crée pas la bonne table.",
    explain: "CREATE TABLE crée une table avec ses colonnes."
};