// import { NFeBuilder, } from './document';
import { NfeFactory } from './fiscal-doc';

export class DocumentoFiscalFactory {
    static CriarFactory(tipo) {
        switch (tipo) {
            case "NF-e":
                return new NfeFactory();
            default:
                throw new Error(`Tipo de documento fiscal desconhecido: ${tipo}`);
        }
    }
}
