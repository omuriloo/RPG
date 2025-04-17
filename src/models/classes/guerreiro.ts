import { Item } from "../item";
import { Personagem } from "../personagem";

export class Guerreiro extends Personagem {
    vida: number;
    nome: string;
    forca: number;
    defesa: number;
    itens: Item[];

    constructor(vida: number, nome: string, forca: number, defesa: number) {

        super(vida, nome, forca, defesa);

        this.vida = vida;
        this.nome = nome;
        this.forca = forca;
        this.defesa = defesa
        this.itens = []
    }

    escudo(ataque: number): void {
        var proteger: boolean = Math.random() < 0.5;
        if (proteger = true) {
            ataque = 0;
            return console.log("Ataque anulado!")
        } else {
            return console.log("Você foi atingido.")
        }
    }

    furia(vida: number, forca: number) {
        if (vida < 25 && vida > 0) {
            return forca + 10;
        } else {
            return ("Erro.")
        }
    }
}