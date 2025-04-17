import * as readlineSync from 'readline-sync';

import { Personagem } from "./models/personagem";
import { Guerreiro } from "./models/classes/guerreiro";
import { Mago } from "./models/classes/mago";
import { Item } from "./models/item";
import { Goblin } from './models/inimigos/goblin';
import { Dragao } from './models/inimigos/dragao';

const samurai = new Guerreiro(55, "Mulan", 30, 5);
const feiticeiro = new Mago(50, "Elza", 25, 5);
const goblin = new Goblin(40, "Coitado", 20, 0);
const dragao = new Dragao(100, "Dragoa", 25, 0);

let poçãoCura = new Item('Poção', 'Poção', 10);  // O efeito será 'Poção'
let elixirForca = new Item('Energético', 'Energético', 10);  // Efeito 'Energético'
let escudoDefesa = new Item('Hambúrguer', 'Hambúrguer', 5);  // Efeito 'Hambúrguer'

let inimigo = dragao && goblin;

let personagemEscolhido: Personagem;

function escolherPersonagem(): void {
  console.log("Escolha seu personagem:");
  console.log("1. Guerreiro");
  console.log("2. Mago");

  let escolha = readlineSync.question("Digite o número do personagem que deseja jogar (1 ou 2): ");

  while (!['1', '2'].includes(escolha)) {
    console.log("Escolha inválida.");
    escolha = readlineSync.question("Digite o número do personagem que deseja jogar (1 ou 2): ");
  }

  switch (escolha) {
    case "1":
      personagemEscolhido = samurai;
      break;
    case "2":
      personagemEscolhido = feiticeiro;
      break;
  }
}
escolherPersonagem();

function destino(opcoes: string[]): string {
  let escolha: string;
  console.log(opcoes.join('\n'));
  escolha = readlineSync.question('Digite o número da sua escolha: ');

  while (!['1', '2'].includes(escolha)) {
    console.log('Escolha inválida. Tente novamente.');
    escolha = readlineSync.question('Digite o número da sua escolha: ');
  }

  return escolha;
}

iniciarJogo();

function iniciarJogo() {

  let situacao = destino([
    "Você encontra um reino de gelo. O que deseja fazer? 1. Entrar no reino 2. Descansar"
  ]);

  if (situacao === "1") {

    let bau = destino([
      "Você encontrou um baú, o que você deseja fazer? 1. Abrir 2. Passar reto"
    ]);

    if (bau === "1") {
      personagemEscolhido.itens.push(elixirForca);
      console.log("Parabéns! Você recebeu um energético do baú. E na frente dele, há uma escada, você sobe e ela tem duas portas") 
      let premiado = destino(["A porta da riqueza, e a da sabedoria. Qual você escolhe? 1. Riqueza - 2. Sabedoria"])
      if(premiado === "1"){
        console.log("Meus Parabéns! Você conquistou muito dinheiro, comprou o castelo e proporciona viagens turisticas com o dragão.")
      }else if(premiado === "2"){
        console.log("Você adquiriu todo o conhecimento do mundo, mas para o que? Você se joga do castelo e se mata ")
        personagemEscolhido.vida = 0
      }

      console.log("Você encontrou um item!");
    } else if (bau === "2") {
      
      let briga = destino([
        "Você encontra um goblin! O que deseja fazer? 1. Lutar 2. Fugir"
      ]);
      if (briga === "1") {
        batalha(goblin);
      } else if (briga === "2") {
        personagemEscolhido.fuga();
        feiticeiro.teleporte(true);

        let fugiuGoblin = destino([
          "Você conseguiu escapar, mas saindo do reino, você se encontra com o dragão! O que deseja fazer? 1. Lutar 2. Fugir"
        ]);
        if (fugiuGoblin === "1") {
          batalha(dragao);
          if (personagemEscolhido.vive()) {
            console.log("Parabéns!!! Você ganhou o jogo.");
          }
        } else if (fugiuGoblin === "2") {
          console.log("Fujão! O dragão pisou na sua cabeça e você morreu");
          personagemEscolhido.vida = 0;
        }
      }
    }
  } else {
    console.log("Você decide descansar.");
    let morte = destino(["CHUVA DE METEOROS! O que você deseja fazer? 1. Correr 2. Voltar a descansar"]);
    if (morte === "1") {
      personagemEscolhido.vida = 0;
      console.log("Você morreu esmagado por um meteoro. Fim de jogo!")
    } else if (morte === "2") {
      console.log("Era tudo um pesadelo. Você acordou e seguiu seu caminho para casa, desistindo da aventura.");
    }
  }
}

function batalha(inimigo: Personagem) {
  while (personagemEscolhido.vive() && inimigo.vive()) {
    const escolha = readlineSync.question("Escolha uma ação: ")

    if (personagemEscolhido === feiticeiro){
      console.log("1. Atacar - 2. Teleportar - 3. Magia de cura - 4. Bola de fogo - 5. Usar item.");
      if(escolha === "3"){
        feiticeiro.cura();
        console.log(`Você usou um feitiço de cura e sua vida aumentou para ${personagemEscolhido.vida}` )
      }else if(escolha === "4"){
        console.log(`${personagemEscolhido.nome} Atirou uma bola de fogo em ${inimigo.nome}!`);
        feiticeiro.bolaDeFogo(personagemEscolhido.vida, inimigo); 
      
        console.log(`${inimigo.nome} vai atacar agora!`);
        inimigo.atacar(personagemEscolhido);  
      }

  } else if(personagemEscolhido === samurai){
      console.log("1. Atacar - 2. Fugir - 3. Escudo - 4. Furia - 5. Usar item.");
      if(escolha === "3"){
        samurai.escudo(0);
        console.log("Com seu escudo, você conseguiu se defender do ataque!")
      } else if (escolha === "4"){
        samurai.furia(personagemEscolhido.vida, personagemEscolhido.forca);
        console.log(`Você ativou a furia! Ataque aumentado para: ${personagemEscolhido.forca} `)
      }
  }
    if (escolha === "1") {
      console.log(`${personagemEscolhido.nome} atacou ${inimigo.nome}!`);
      personagemEscolhido.atacar(inimigo);  

      if (!inimigo.vive()) {
        console.log(`${inimigo.nome} foi derrotado! Você venceu a batalha.`);
        break;
      }

      console.log(`${inimigo.nome} vai atacar agora!`);
      inimigo.atacar(personagemEscolhido);  
      if (!personagemEscolhido.vive()) {
        console.log(`${personagemEscolhido.nome} foi derrotado. Fim de jogo.`);
        break;

    }} else if (escolha === "2") {
      personagemEscolhido.fuga();

      let fugitivo = destino (["Você tenta fugir do castelo! Pra onde você irá? 1. Iglu - 2. Cidade"])
      if(fugitivo === "1"){
        let iglu = destino (["Os goblins te cercaram! O que você vai fazer? 1. Tentar lutar - 2. Fugir (de algum jeito)"])
        if(iglu === "1"){
          console.log("Parabéns, você tentou lutar contra 6 goblins e foi morto. Fim de jogo.")
          personagemEscolhido.vida = 0
        } else if(iglu === "2"){
          if(personagemEscolhido = feiticeiro){
            feiticeiro.teleporte(true);
            console.log("Você percebeu que não nasceu para aventuras, e se teletransportou para o Hawaii")
          }else if(personagemEscolhido = samurai){
            console.log("Tropeçou na tentativa e morreu. Fim de jogo.")
            personagemEscolhido.vida = 0
          }
        }
      }
      break;
    } else if (escolha === "5") {
      console.log("Escolha um item para usar:");
      personagemEscolhido.itens.forEach((item, index) => {
        console.log(`${index + 1}. ${item.nomeItem}`);
      });

      let itemEscolhido = readlineSync.question("Digite o número do item que deseja usar: ");
      const item = personagemEscolhido.itens[parseInt(itemEscolhido) - 1];

      if (item) {
        item.usarItem(personagemEscolhido);  
      } else {
        console.log("Erro ao usar o item.");
      }

      if (!inimigo.vive()) {
        console.log("Você venceu a batalha!");
        break;
      }

      console.log("\nAgora é a vez do inimigo!");
      inimigo.atacar(personagemEscolhido);

      if (!personagemEscolhido.vive()) {
        console.log("Você foi derrotado. Fim de jogo.");
        break;
      }
    }
  }
}
