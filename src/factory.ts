// import { NFeBuilder, } from './document';
import { NFe } from './fiscal-doc';
import { NFeFactory } from './nfe';

export interface DocumentoFiscalFactory {
    criarNFe(): NFe;
}

export class DocumentoFiscalConcretaFactory implements DocumentoFiscalFactory {
    criarNFe(): NFe {
        return new NFeFactory();
    }
}