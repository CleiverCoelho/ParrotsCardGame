const cartaImagemPadrao = './images/back.png';
const listaCartasImagens = ["./images/bobrossparrot.gif", "./images/explodyparrot.gif", "./images/fiestaparrot.gif", 
    "./images/metalparrot.gif", "./images/revertitparrot.gif", "./images/tripletsparrot.gif", "./images/unicornparrot.gif"]

let listaCartasSelecionadas = [];
let listaCartasViaradas = [];

let qtdCartas;
carregarCardBoard();

function virarCarta(cartaSelecionada){
    cartaSelecionada.classList.toggle("virada");
}

function carregarCardBoard(){
    
    while(true){
        qtdCartas = prompt("Digite a quantidade de cartas: ");
        const condicaoIntervaloCartas = (qtdCartas <= 14) && (qtdCartas >= 4);
        const condicaoParidadeCartas = (qtdCartas % 2 == 0);
        if(condicaoIntervaloCartas && condicaoParidadeCartas){
            break;
        }
        alert("Numero Invalido de Cartas! Digite Novamente.");
    }
    // randomizando lista de cartas da DataBase
    console.log("Lista de Cartas antes do Sort: \n" + listaCartasImagens);
    listaCartasImagens.sort(comparador);
    console.log("Lista de Cartas depois do Sort: \n" + listaCartasImagens);
    for(let i = 0; i < qtdCartas / 2; i++){
        listaCartasSelecionadas.push(listaCartasImagens[i]);
        listaCartasSelecionadas.push(listaCartasImagens[i]);
    }

    const cardBoard = document.querySelector(".cardboard");
    const tamanhoListaSelecionadas = listaCartasSelecionadas.length;
    // randomizando a ordem que as cartas vao aparecer no html
    listaCartasSelecionadas.sort(comparador);
    for(let j = 0; j < tamanhoListaSelecionadas; j++){
        adicionaNoHtml(cardBoard, listaCartasSelecionadas[j]);
    }
    console.log(listaCartasSelecionadas);
}

function comparador(){
    return Math.random() - 0.5;
}
function adicionaNoHtml(cardBoard, imagemCarta){
    cardBoard.innerHTML = cardBoard.innerHTML + `<div onclick="virarCarta(this)" class="card">
        <div class="front-face face">
            <img src="${cartaImagemPadrao}">
        </div>
        <div class="back-face face">
            <img src="${imagemCarta}">
        </div>
    </div>`;
}