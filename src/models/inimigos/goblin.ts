import { Personagem } from "../personagem";

export class Goblin extends Personagem {
    vida: number;
    nome: string;
    forca: number;
    defesa: number;

    constructor(vida: number, nome: string, forca: number, defesa: number) {
        super(vida, nome, forca, defesa);

        this.vida = vida;
        this.nome = nome;
        this.forca = forca;
        this.defesa = defesa
    }
}