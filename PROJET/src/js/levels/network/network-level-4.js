export default {
    id: 4,
    world: "network",
    worldName: "La Zone Réseau",
    title: "Passerelle",
    intro: "Le réseau local est 192.168.1.0/24 et le routeur est en .1.",
    course: { title: "Configuration", points: ["ifconfig affiche la config réseau", "ip addr sur les systèmes modernes", "hostname -I affiche l'IP"] },
    type: "text",
    question: "Quelle passerelle par défaut faut-il mettre ?",
    answer: "192.168.1.1",
    aliases: [],
    success: "La passerelle est correcte.",
    fail: "La passerelle ne correspond pas au routeur donné.",
    explain: "La passerelle doit être l'adresse du routeur du réseau."
};