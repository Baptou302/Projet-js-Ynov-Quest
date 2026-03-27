const joinPath = (base, next) => {
    if (next === '..') return base.split('/').slice(0, -1).join('/') || '/';
    if (next.startsWith('/')) return next;
    return (base + '/' + next).replace(/\/+/g, '/');
};

const printLine = (history, text = '') => {
    history.innerHTML += `<div>${text}</div>`;
    history.scrollTop = history.scrollHeight;
};

const isProtected = (level, path) => (level.protectedFiles || []).includes(path);

const commands = {
    help: () => 'ls, ls -a, pwd, cd, cat, sudo -l, sudo cat, clear',
    pwd: (l, s) => s.path,
    ls: (l, s) => l.dirs[s.path]?.filter(n => !n.startsWith('.')).join('  ') || '',
    'ls -a': (l, s) => l.dirs[s.path]?.join('  ') || '',
    clear: () => '__CLEAR__'
};

function runCommand(level, state, command) {
    const value = command.trim();
    if (!value) return '';
    if (commands[value]) return commands[value](level, state);
    if (value === 'sudo -l') {
        state.sudoChecked = true;
        return 'User player may run the following commands on host:\n    (root) NOPASSWD: /bin/cat';
    }
    if (value.startsWith('cd ')) {
        const next = joinPath(state.path, value.slice(3).trim());
        if (next.startsWith('/root')) return 'Permission denied';
        if (level.dirs[next]) { state.path = next; return ''; }
        return 'bash: cd: No such file or directory';
    }
    if (value.startsWith('sudo cat ')) {
        const n = value.slice(9).trim(), fp = n.startsWith('/') ? n : joinPath(state.path, n);
        return !state.sudoChecked ? 'sudo: permission denied' : (level.files[fp] || 'cat: No such file');
    }
    if (value.startsWith('cat ')) {
        const n = value.slice(4).trim(), fp = n.startsWith('/') ? n : joinPath(state.path, n);
        if (isProtected(level, fp)) return 'Permission denied';
        return level.files[fp] || 'cat: No such file';
    }
    return 'Vous ne pouvez pas utiliser cette commande dans ce niveau.';
}

function initTerminal(level) {
    const history = document.getElementById('terminal-history');
    const input = document.getElementById('terminal-input');
    const button = document.getElementById('terminal-run');
    const state = { path: level.startPath, sudoChecked: false };
    printLine(history, `player@host:${state.path}$`);
    const execute = () => {
        const cmd = input.value.trim();
        if (!cmd) return;
        printLine(history, `player@host:${state.path}$ ${cmd}`);
        const result = runCommand(level, state, cmd);
        if (result === '__CLEAR__') history.innerHTML = '';
        else if (result) printLine(history, result);
        input.value = '';
    };
    button.onclick = execute;
    input.onkeydown = e => e.key === 'Enter' && execute();
}

export default initTerminal;
