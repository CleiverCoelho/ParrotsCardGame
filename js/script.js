// Declaração de funcoes globais e inicializacao do jogo

const cartaImagemPadrao = './images/back.png';
const listaCartasImagens = ["./images/bobrossparrot.gif", "./images/explodyparrot.gif", "./images/fiestaparrot.gif", 
    "./images/metalparrot.gif", "./images/revertitparrot.gif", "./images/tripletsparrot.gif", "./images/unicornparrot.gif"]

const listaCartasSelecionadas = [];
const listaCartasViradas = [];

let qtdJogadas = 0;
let qtdCartas = 0;
let parDeCartasViradas = 0;
carregarCardBoard();


// aqui acaba codigo de configuracao de jogo. start!

function realizarJogada(cartaSelecionada){

    const listaJogada = [];
    const opcaoImagens = document.querySelectorAll(".back-face img");
    let indice = 0;
    while(true){
        if(opcaoImagens[indice].parentNode.parentNode == cartaSelecionada){
            virarCarta(cartaSelecionada);
            // adicionar em cartas viradas uma listaJogada em que as posicoes
            // listaJogada[0] corresponde a div carta
            // listaJogada[1] corresponde ao src da imagem a ser comparada
            listaJogada.push(cartaSelecionada);
            listaJogada.push(opcaoImagens[indice].src);
            listaCartasViradas.push(listaJogada);
            break;
        }else if(indice == 90){
            // para nao travar o site em testes
            console.log("COUNT EXCEDIDO::: " + indice);
            break;
        }
        indice++;
    }
    qtdJogadas++;
    if(listaCartasViradas.length == 2){
        setTimeout(verificarJogada, 1000);
    }
}

function verificarJogada(){

    if(listaCartasViradas[0][1] == listaCartasViradas[1][1]){
        parDeCartasViradas++;
        console.log("QUANTIDADE DE PAR DE CARTAS VIRADAS: \n" + parDeCartasViradas);
        console.log("QUANTIDADE DE CARTAS DIVIDO POR DOIS: \n" + qtdCartas/2);

        if(parDeCartasViradas == (qtdCartas / 2)){
            alert(`Você ganhou em ${qtdJogadas} jogadas!`);
            // alert("Pressione Ok para reiniciar!");
            // carregarCardBoard();
        }
    }else{
        // desvirar cartas viradas pois nao deu match
        // vai virar pois virar carta está com toggle
        virarCarta(listaCartasViradas[0][0]);
        virarCarta(listaCartasViradas[1][0]);
        // funcao para limpar os elementos da lista
    }
    // limpar lista de Cartas Viradas
    while(listaCartasViradas.length){
        listaCartasViradas.pop();
    }
}


function virarCarta(cartaSelecionada){
    cartaSelecionada.classList.toggle("virada");
}

function carregarCardBoard(){
    qtdJogadas = 0;
    qtdCartas = 0;
    parDeCartasViradas = 0;

    // limpar lista de cartasSelecionadas em caso de reinicio
    while(listaCartasSelecionadas.length){
        listaCartasSelecionadas.pop();
    }

    while(true){
        qtdCartas = Number(prompt("Digite a quantidade de cartas: "));
        const condicaoIntervaloCartas = (qtdCartas <= 14) && (qtdCartas >= 4);
        const condicaoParidadeCartas = (qtdCartas % 2 == 0);
        if(condicaoIntervaloCartas && condicaoParidadeCartas){
            break;
        }
        alert("Numero Invalido de Cartas! Digite Novamente.");
    }
    // randomizando lista de cartas da DataBase
    // console.log("Lista de Cartas antes do Sort: \n" + listaCartasImagens);
    listaCartasImagens.sort(comparador);
    // console.log("Lista de Cartas depois do Sort: \n" + listaCartasImagens);
    for(let i = 0; i < qtdCartas / 2; i++){
        listaCartasSelecionadas.push(listaCartasImagens[i]);
        listaCartasSelecionadas.push(listaCartasImagens[i]);
    }

    const cardBoard = document.querySelector(".cardboard");
    // limpando cardBoard em caso de reinicio de jogo;
    cardBoard.innerHTML = " ";
    const tamanhoListaSelecionadas = listaCartasSelecionadas.length;
    // randomizando a ordem que as cartas vao aparecer no html
    listaCartasSelecionadas.sort(comparador);
    for(let j = 0; j < tamanhoListaSelecionadas; j++){
        adicionaNoHtml(cardBoard, listaCartasSelecionadas[j]);
    }
    // console.log(listaCartasSelecionadas);
}

function comparador(){
    return Math.random() - 0.5;
}
function adicionaNoHtml(cardBoard, imagemCarta){
    cardBoard.innerHTML = cardBoard.innerHTML + `<div data-test="card" onclick="realizarJogada(this)" class="card">
        <div data-test="face-down-image" class="front-face face">
            <img src="${cartaImagemPadrao}">
        </div>
        <div data-test="face-up-image" class="back-face face">
            <img src="${imagemCarta}">
        </div>
    </div>`;
}