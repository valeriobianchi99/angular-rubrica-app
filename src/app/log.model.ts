import { Utente } from './utente.model';

export class Log {
    id: number;
    dataModifica: string;
    operazione: string;
    oggetto: string;
    dettagliOperazione: object;
    utenteDTO: Utente;
    operazioneCompletata: boolean;
}