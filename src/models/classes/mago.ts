import { Personagem } from "../personagem";

export class Mago extends Personagem {
    vida: number;
    nome: string;
    forca: number;
    defesa: number;
    itens: [] = []

    constructor(vida: number, nome: string, forca: number, defesa: number) {
        super(vida, nome, forca, defesa);

        this.vida = vida;
        this.nome = nome;
        this.forca = forca;
        this.defesa = defesa
    }

    cura() {
        const curarVida: number = 20;
        this.vida += curarVida;

        const vidaMaxima: number = 50;
        if (this.vida > vidaMaxima) {
            this.vida = vidaMaxima;
        }
    }

    teleporte(fuga: boolean): boolean {
        return fuga = true;
    }

    bolaDeFogo(vida: number, inimigo: Personagem){
        if (this.vida <= 30) {
            const dano = Math.max(0, this.forca + 10); 
            inimigo.receberDano(dano);
        }
    }
}