const fases = [
    { nome: "Inspire", escala: 1.0, duracao: 4000 },
    { nome: "Segure", escala: 1.0, duracao: 4000 },
    { nome: "Expire", escala: 0.7, duracao: 6000 },
    { nome: "Aguarde", escala: 0.7, duracao: 2000 }
];

const modos = {
    rapido: [2000, 2000, 4000, 2000],
    leve: [3000, 3000, 5000, 2000],
    profundo: [4000, 4000, 6000, 2000]
};

const totalCiclos = 5;

let ligado = false;
let cicloAtual = 0;
let timeoutAtual = null;

const faseTexto = document.getElementById("fase");
const botao = document.getElementById("pp");
const clover = document.getElementById("clover");

const overlayAjuda = document.getElementById("overlay");
const overlayModos = document.getElementById("overlayModos");

function atualizarBotao() {
    botao.textContent = ligado ? "⏹" : "▶";
}

function resetarFlor() {
    clover.style.transition = "transform 1s ease";
    clover.style.transform = "scale(0.7)";
}

function aplicarFase(fase) {
    faseTexto.textContent =
        `Ciclo ${cicloAtual + 1} – ${fase.nome}`;

    clover.style.transition =
        `transform ${fase.duracao}ms ease-in-out`;

    clover.style.transform =
        `scale(${fase.escala})`;
}

function finalizarSessao() {
    ligado = false;

    atualizarBotao();

    faseTexto.textContent =
        "Todos os ciclos concluídos.";

    timeoutAtual = setTimeout(() => {
        faseTexto.textContent =
            "Pressione para Iniciar";

        resetarFlor();
    }, 2000);
}

function executarFase(indiceFase = 0) {

    if (!ligado) return;

    if (indiceFase >= fases.length) {

        cicloAtual++;

        if (cicloAtual >= totalCiclos) {
            finalizarSessao();
            return;
        }

        timeoutAtual = setTimeout(() => {
            executarFase(0);
        }, 500);

        return;
    }

    const fase = fases[indiceFase];

    aplicarFase(fase);

    timeoutAtual = setTimeout(() => {
        executarFase(indiceFase + 1);
    }, fase.duracao);
}

function comecar() {

    if (ligado) {
        stop();
        return;
    }

    cicloAtual = 0;
    ligado = true;

    atualizarBotao();

    executarFase();
}

function stop() {

    ligado = false;

    if (timeoutAtual) {
        clearTimeout(timeoutAtual);
        timeoutAtual = null;
    }

    atualizarBotao();

    faseTexto.textContent =
        "Pressione para Iniciar";

    resetarFlor();
}

function modo(tipo) {

    let tempos;

    switch (tipo) {

        case 0:
            tempos = modos.rapido;
            break;

        case 1:
            tempos = modos.leve;
            break;

        case 2:
            tempos = modos.profundo;
            break;

        default:
            return;
    }

    fases.forEach((fase, indice) => {
        fase.duracao = tempos[indice];
    });

    fecharModos();
}

function abrirAjuda() {
    overlayAjuda.classList.add("aberto");
}

function fecharAjuda() {
    overlayAjuda.classList.remove("aberto");
}

function abrirModos() {
    overlayModos.classList.add("aberto");
}

function fecharModos() {
    overlayModos.classList.remove("aberto");
}

window.addEventListener("load", () => {

    atualizarBotao();

    faseTexto.textContent =
        "Pressione para Iniciar";

    resetarFlor();
});