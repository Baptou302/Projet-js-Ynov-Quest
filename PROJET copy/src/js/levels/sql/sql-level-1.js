export default {
    id: 1,
    world: "sql",
    worldName: "La Base Centrale",
    title: "Créer la base",
    intro: "Le client veut une base de données nommée entreprise.",
    courseKey: "create",
    type: "text",
    question: "Quelle commande SQL permet de créer cette base ?",
    answer: "create database entreprise;",
    aliases: ["create database entreprise"],
    success: "La base a été créée.",
    fail: "La commande SQL n'est pas correcte.",
    explain: "CREATE DATABASE sert à créer une nouvelle base."
};