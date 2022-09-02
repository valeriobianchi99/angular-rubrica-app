export class Utente {
    id: number;
    nome: string;
    numero: number;
    padre: Utente;
    figli: Utente[];
}