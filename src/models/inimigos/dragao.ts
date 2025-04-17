import { Personagem } from "../personagem";

export class Dragao extends Personagem {
    vida: number = 100;
    nome: string;
    forca: number = 15;
    defesa: number = 0;

    constructor(vida: number, nome: string, forca: number, defesa: number) {
        super(vida, nome, forca, defesa);

        this.vida = vida;
        this.nome = nome;
        this.forca = forca;
        this.defesa = defesa
    }
}