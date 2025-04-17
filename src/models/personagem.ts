import { Item } from "./item";

export class Personagem {
    vida: number = 60;
    nome: string;
    forca: number = 20;
    defesa: number = 10;
    itens: Item[];

    constructor(vida: number, nome: string, forca: number, defesa: number) {
        this.vida = vida;
        this.nome = nome;
        this.forca = forca;
        this.defesa = defesa;
        this.itens = [];
    }

    atacar(inimigo: Personagem): void {
        const dano = Math.max(0, this.forca - inimigo.defesa);  
        inimigo.receberDano(dano);
    }

    usarItemBatalha(nomeItem: string): void {
        const itemIndex = this.itens.findIndex(item => item.nomeItem === nomeItem);
    
        if (itemIndex !== -1) {
          const item = this.itens[itemIndex];
    
          item.usarItem(this);
    
          this.itens.splice(itemIndex, 1);
        } else {
          console.log(`O item ${nomeItem} não foi encontrado no inventário.`);
        }
      }

      receberDano(dano: number): void {
        this.vida -= dano;  
        if (this.vida < 1) {
            this.vida = 0;
        }
        console.log(`${this.nome} recebeu ${dano} de dano! Vida atual: ${this.vida}`);
    }

    fuga(): void {
        var fugir: boolean = Math.random() < 0.5;
        if (fugir = true) {

            return console.log("Fugiu!")
        } else {
            return console.log("Não conseguiu fugir...")
        }
    }

    removerItem(nomeItem: string): void {
        this.itens = this.itens.filter(item => item.nomeItem !== nomeItem);
        console.log(`${this.nome} removeu o item ${nomeItem} do inventário.`);
    }

    vive(): boolean {
        return this.vida > 0;
    }

    adicionarItem(item: Item): void {
        this.itens.push(item);
        console.log(`${this.nome} adquiriu o item: ${item.nomeItem}`);
    }
}