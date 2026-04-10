export default {
    id: 1,
    world: "network",
    worldName: "La Zone Réseau",
    title: "Identifier une IP valide",
    intro: "Une machine du labo doit recevoir une adresse du réseau 192.168.1.0/24.",
    course: { title: "Rappel Réseau", points: ["Une IP valide un adresse unique", "192.168.1.0/24 signifie 192.168.1.x", "/24 = 256 adresses possibles"] },
    type: "text",
    question: "Donne une IP valide possible pour cette machine.",
    answer: "192.168.1.10",
    aliases: ["192.168.1.20", "192.168.1.50", "192.168.1.100"],
    success: "L'adresse proposée est cohérente.",
    fail: "Cette IP ne correspond pas au réseau demandé.",
    explain: "Avec /24, la machine doit être en 192.168.1.x."
};