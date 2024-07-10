const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const descansoCurto = document.querySelector(".app__card-button--curto");
const descansoLongo = document.querySelector(".app__card-button--longo");
const img = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaInput = document.querySelector("#alternar-musica");
const audio = new Audio("sons/luna-rise-part-one.mp3");
const startPause = document.querySelector("#start-pause");
const texto = document.querySelector("#start-pause span");
const iconeBotao = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");

let tempo = 1500;
let intervalo = null;

audio.loop = true;

musicaInput.addEventListener("change", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

focoBt.addEventListener("click", () => {
    alterarContexto("foco");
    focoBt.classList.add("active");
    tempo = 1500;
    mostrarTempo();
});

descansoCurto.addEventListener("click", () => {
    alterarContexto("descanso-curto");

    descansoCurto.classList.add("active");
    tempo = 300;
    mostrarTempo();
});

descansoLongo.addEventListener("click", () => {
    alterarContexto("descanso-longo");
    descansoLongo.classList.add("active");
    tempo = 900;
    mostrarTempo();
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    });
    html.setAttribute("data-contexto", contexto);
    img.setAttribute("src", `imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br />
                    <strong class="app__title-strong"
                        >mergulhe no que importa.</strong
                    >
            `;

            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class= "app__title-strong"> Faça uma pausa curta!</strong>
            `;
            break;

        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong"> Faça uma longa pausa.</strong>
            `;
            break;
        default:
            break;
    }
}

const contagem = () => {
    if (tempo <= 0) {
        alert("Tempo Finalizado");
        zerar();
        return;
    }
    tempo -= 1;
    mostrarTempo();
};

startPause.addEventListener("click", iniciar);

function iniciar() {
    texto.textContent = "Pausar";
    if (intervalo) {
        zerar();
        return;
    }
    intervalo = setInterval(contagem, 1000);
    iconeBotao.setAttribute("src", "imagens/pause.png");
}

function zerar() {
    clearInterval(intervalo);
    texto.textContent = "Começar";
    iconeBotao.setAttribute("src", "imagens/play_arrow.png");
    intervalo = null;
}

function mostrarTempo() {
    const tempoDecorrido = new Date(tempo * 1000);
    const tempoFormatado = tempoDecorrido.toLocaleTimeString("pt-br", {
        minute: "2-digit",
        second: "2-digit",
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
