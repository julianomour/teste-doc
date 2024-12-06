import { NFeBuilder, } from './document';

export class DocumentoFiscalFactory {
    static criarBuilder(tipo) {
        switch (tipo) {
            case "NF-e":
                return new NFeBuilder();
            default:
                throw new Error(`Tipo de documento fiscal desconhecido: ${tipo}`);
        }
    }
}
