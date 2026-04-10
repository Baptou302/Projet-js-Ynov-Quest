export const normalize = v => v.trim().toLowerCase().replace(/\s+/g, " ");

export const enableQcmPick = () => {
    document.querySelectorAll("[data-answer]").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll("[data-answer]").forEach(b => b.classList.remove("picked"));
            btn.classList.add("picked");
        };
    });
};