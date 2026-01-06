
let listaDeNumerosSorteados =[]; // tem que estar na primeira linha do código.
let numeroLimite = 10;
// let titulo = document.querySelector("h1");
// titulo.innerHTML ="Jogo do Número Secreto";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número entre 1 e 10";

let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

//função com parâmetros
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
   // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}) // O API do responsive voice que faz o pc falar para dar acessibilidade parou de funcionar

   //Esse outro código substitui o responsiveVoice

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

exibirTextoNaTela("h1","Jogo do Número Secreto");
exibirTextoNaTela("p", "Escolha um número entre 1 e 10");

//função sem parâmetro e sem retorno
function verificarChute(){
    let chute = document.querySelector("input").value; //use .value pra capturar valores digitados no corpo da página, semelhante ao prompt.
    
    console.log("botao clicado");
    console.log(chute == numeroSecreto);

    if(chute == numeroSecreto){
        
        exibirTextoNaTela("h1", "Acertou!");

        let palavaTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        exibirTextoNaTela("p", `Você acertou o número secreto com  ${tentativas} ${palavaTentativa}!`);

        document.getElementById("reiniciar").removeAttribute("disabled") // removendo um atributo que está no html, poderia ser qualquer um
        
    }
    else{
        if(chute > numeroSecreto){
            exibirTextoNaTela("p", "o numero secreto é menor")

        }
        else{
            exibirTextoNaTela("p", "o numero secreto é maior")
        }
        tentativas++;
        limparCampo();
    }
}


//função com retorno
function gerarNumeroAleatorio(){
   //return parseInt(Math.random()*10 +1);tem que colocar o return pra ele guardar o valor

   let numeroGerado = parseInt(Math.random()*numeroLimite +1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // isso é para não dar erro quando atingir a quantidade de numeros posíveis dentro do array, no caso de 1 a 10.
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];

    }

   if(listaDeNumerosSorteados.includes(numeroGerado)){
    return gerarNumeroAleatorio();

   }
   else{
    listaDeNumerosSorteados.push(numeroGerado);
    console.log(listaDeNumerosSorteados);
    return numeroGerado;
    
    
   }


}

function limparCampo(){
    chute = document.querySelector("input"); // está aproveitando e não declarando novamente pois já foi declarada na linha 22.
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoNaTela("h1","Jogo do Número Secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

