import { Personagem } from "./personagem";

export class Item {
    nomeItem: string;
    efeito: string;
    valor: number;

    constructor(nomeItem: string, efeito: string, valor: number) {
        this.nomeItem = nomeItem;
        this.efeito = efeito;
        this.valor = valor;
    }

    usarItem(personagem: Personagem): void {
        const itemExiste = personagem.itens.find(i => i.nomeItem === this.nomeItem);

        if (itemExiste) {
            console.log(`item usado: ${this.nomeItem}`);

            switch (this.efeito) {
                case 'Poção':
                    personagem.vida += this.valor = 10;
                    console.log(`Você recuperou ${this.valor} de vida! Sua vida atual é: ${personagem.vida}`);
                    break;
                case 'Energético':
                    personagem.forca += this.valor = 10;
                    console.log(`Você ganhou ${this.valor} de força! Sua força atual é: ${personagem.forca}`);
                    break;
                case 'Hambúrguer':
                    personagem.defesa += this.valor = 5;
                    console.log(`Você ganhou ${this.valor} de defesa. Sua defesa atual é: ${personagem.defesa}`);
                    break;
                default:
                    console.log('Efeito do item desconhecido.');
                    break;
            }
            personagem.removerItem(this.nomeItem);
        } else {
            console.log(`item não encontrado.`);
        }
    }
}