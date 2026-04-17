const worldMusic = {
    archives: "assets/musique/1.m4a",
    network:  "assets/musique/2.m4a",
    sql:      "assets/musique/3.m4a"
};

let current = null;

export function playMusic(worldId) {
    const src = worldMusic[worldId];
    if (!src) { stopMusic(); return; }
    if (current && current.src.endsWith(src)) return;
    stopMusic();
    current = new Audio(src);
    current.loop = true;
    current.volume = 0.5;
    current.play().catch(() => {});
}

export function stopMusic() {
    if (current) { current.pause(); current = null; }
}
