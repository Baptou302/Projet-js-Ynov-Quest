export default {
    id: 2,
    world: "network",
    worldName: "La Zone Réseau",
    title: "Masque réseau",
    intro: "Tu configures un petit réseau local classique en /24.",
    course: { title: "Configuration", points: ["ifconfig affiche la config réseau", "ip addr sur les systèmes modernes", "hostname -I affiche l'IP"] },
    type: "text",
    question: "Quel masque correspond à un réseau /24 ?",
    answer: "255.255.255.0",
    aliases: [],
    success: "Le masque est correct.",
    fail: "Ce masque ne correspond pas à /24.",
    explain: "Le masque d'un réseau /24 est 255.255.255.0."
};