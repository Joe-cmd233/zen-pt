const fases = [
    { nome: "Inspire", escala: 1.0, duracao: 4000 },
    { nome: "Segure", escala: 1.0, duracao: 4000 },
    { nome: "Expire", escala: 0.7, duracao: 6000 },
    { nome: "Aguarde", escala: 0.7, duracao: 2000 }
];

const modos = {
    rapi: [2000, 2000, 4000, 2000],
    leve: [3000, 3000, 5000, 2000],
    prof: [4000, 4000, 6000, 2000],
    test: [300, 300, 300, 300]
};

let cicloAtual = 0;
let ligado = false;
let timeoutAtual = null;

const totalCiclos = 5;

const faseTexto = document.getElementById("fase");
const botao = document.getElementById("pp");
const clover = document.getElementById("clover");
const select = document.getElementById("select");
const overlay = document.getElementById("overlay");

function atualizarBotao() {
    botao.textContent = ligado ? "⏹" : "▶";
}

function resetarFlor() {
    clover.style.transition = "transform 1s ease";
    clover.style.transform = "scale(0.7)";
}

function restaurarInterface() {
    select.style.opacity = "1";
    faseTexto.innerText = "Pressione para Iniciar.";
    atualizarBotao();
    resetarFlor();
}

function iniciarInterface() {
    select.style.opacity = "0";
    atualizarBotao();
}

function aplicarFase(fase) {
    faseTexto.innerText =
        `Ciclo ${cicloAtual + 1} – ${fase.nome}`;

    clover.style.transitionDuration =
        `${fase.duracao}ms`;

    clover.style.transform =
        `scale(${fase.escala})`;
}

function proximoCiclo() {
    if (!ligado) return;

    if (cicloAtual >= totalCiclos) {
        ligado = false;

        faseTexto.innerText =
            "Todos os ciclos concluídos.";

        select.style.opacity = "1";

        atualizarBotao();

        timeoutAtual = setTimeout(() => {
            faseTexto.innerText =
                "Pressione para Iniciar.";
            resetarFlor();
        }, 2000);

        return;
    }

    let indiceFase = 0;

    function executarFase() {
        if (!ligado) return;

        if (indiceFase >= fases.length) {
            cicloAtual++;

            timeoutAtual = setTimeout(
                proximoCiclo,
                500
            );

            return;
        }

        const fase = fases[indiceFase];

        aplicarFase(fase);

        indiceFase++;

        timeoutAtual = setTimeout(
            executarFase,
            fase.duracao
        );
    }

    executarFase();
}

function comecar() {
    if (ligado) {
        stop();
        return;
    }

    cicloAtual = 0;
    ligado = true;

    iniciarInterface();
    proximoCiclo();
}

function stop() {
    ligado = false;

    if (timeoutAtual) {
        clearTimeout(timeoutAtual);
        timeoutAtual = null;
    }

    restaurarInterface();
}

function modo(mod) {
    let tempos;

    switch (mod) {
        case 0:
            tempos = modos.rapi;
            break;

        case 1:
            tempos = modos.leve;
            break;

        case 2:
            tempos = modos.prof;
            break;

        case 3:
            tempos = modos.test;
            break;

        default:
            return;
    }

    fases.forEach((fase, i) => {
        fase.duracao = tempos[i];
    });
}

function abrirAjuda() {
    overlay.classList.add("aberto");
}

function fecharAjuda() {
    overlay.classList.remove("aberto");
}

window.addEventListener("load", () => {
    restaurarInterface();
});