function joinPath(base, next) {

    if (next === "..") {
        return base.split("/").slice(0, -1).join("/") || "/";
    }

    if (next.startsWith("/")) {
        return next;
    }

    return (base + "/" + next).replace(/\/+/g, "/");
}


function printLine(history, text = "") {

    history.innerHTML += `<div>${text}</div>`;

    history.scrollTop = history.scrollHeight;
}


function isProtected(level, path) {

    return (level.protectedFiles || []).includes(path);
}


function runCommand(level, state, command) {

    const value = command.trim();

    if (!value) return "";

    // help

    if (value === "help") {
        return "ls, ls -a, pwd, cd, cat, sudo -l, sudo cat, clear";
    }


    // pwd

    if (value === "pwd") {
        return state.path;
    }


    // ls

    if (value === "ls") {

        const list = level.dirs[state.path] || [];

        const visible = list.filter(name => !name.startsWith("."));

        return visible.join("  ") || "";
    }


    // ls -a

    if (value === "ls -a") {

        const list = level.dirs[state.path] || [];

        return list.join("  ") || "";
    }


    // clear

    if (value === "clear") {
        return "__CLEAR__";
    }


    // sudo -l

    if (value === "sudo -l") {

        state.sudoChecked = true;

        return (
`User player may run the following commands on host:
    (root) NOPASSWD: /bin/cat`
        );
    }


    // cd

    if (value.startsWith("cd ")) {

        const target = value.slice(3).trim();

        const next = joinPath(state.path, target);

        if (next.startsWith("/root")) {
            return "Permission denied";
        }

        if (level.dirs[next]) {

            state.path = next;

            return "";
        }

        return "bash: cd: No such file or directory";
    }


    // sudo cat

    if (value.startsWith("sudo cat ")) {

        const name = value.slice(9).trim();

        const filePath = name.startsWith("/")
            ? name
            : joinPath(state.path, name);

        if (!state.sudoChecked) {
            return "sudo: permission denied";
        }

        return level.files[filePath] || "cat: No such file";
    }


    // cat

    if (value.startsWith("cat ")) {

        const name = value.slice(4).trim();

        const filePath = name.startsWith("/")
            ? name
            : joinPath(state.path, name);

        if (isProtected(level, filePath)) {
            return "Permission denied";
        }

        return level.files[filePath] || "cat: No such file";
    }


    return "Vous ne pouvez pas utiliser cette commande dans ce niveau.";
}

function initTerminal(level) {

    const history = document.getElementById("terminal-history");

    const input = document.getElementById("terminal-input");

    const button = document.getElementById("terminal-run");

    const state = {

        path: level.startPath,

        sudoChecked: false

    };


    printLine(history, `player@host:${state.path}$`);


    function execute() {

        const command = input.value.trim();

        if (!command) return;


        printLine(
            history,
            `player@host:${state.path}$ ${command}`
        );


        const result = runCommand(
            level,
            state,
            command
        );


        if (result === "__CLEAR__") {

            history.innerHTML = "";

        } else if (result) {

            printLine(history, result);

        }


        input.value = "";
    }


    button.onclick = execute;


    input.onkeydown = e => {

        if (e.key === "Enter") {
            execute();
        }

    };
}


export default initTerminal;