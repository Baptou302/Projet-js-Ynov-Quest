const courses = {
    archives: {
        files: {
            title: "Rappel Terminal",
            points: ["ls affiche le contenu du dossier courant", "cat lit un fichier texte"]
        },
        navigation: {
            title: "Rappel Navigation",
            points: ["cd nom entre dans un dossier", "cd .. remonte d'un dossier", "pwd affiche le chemin actuel"]
        }
    },
    network: {
        basics: {
            title: "Rappel Réseau",
            points: ["Une IP valide un adresse unique", "192.168.1.0/24 signifie 192.168.1.x", "/24 = 256 adresses possibles"]
        },
        config: {
            title: "Configuration",
            points: ["ifconfig affiche la config réseau", "ip addr sur les systèmes modernes", "hostname -I affiche l'IP"]
        }
    },
    sql: {
        create: {
            title: "Création de base",
            points: ["CREATE DATABASE crée une base", "SHOW DATABASES liste les bases", "USE sélectionne une base"]
        },
        data: {
            title: "Manipulation de données",
            points: ["INSERT ajoute des lignes", "SELECT récupère les données", "WHERE filtre les résultats"]
        }
    }
};

export default courses;
