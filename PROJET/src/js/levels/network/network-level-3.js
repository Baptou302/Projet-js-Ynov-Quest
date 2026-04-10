export default {
    id: 3,
    world: "network",
    worldName: "La Zone Réseau",
    title: "Tester la connexion",
    intro: "Tu veux vérifier si la machine 192.168.1.20 répond.",
    course: { title: "Rappel Réseau", points: ["Une IP valide un adresse unique", "192.168.1.0/24 signifie 192.168.1.x", "/24 = 256 adresses possibles"] },
    type: "text",
    question: "Quelle commande simple utilises-tu ?",
    answer: "ping 192.168.1.20",
    aliases: [],
    success: "Le test réseau est prêt.",
    fail: "Ce n'est pas la bonne commande de test.",
    explain: "ping permet de tester si une machine répond sur le réseau."
};