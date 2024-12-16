class TipoDocumento {
    tipo: string;
}

export class Pessoa {
    nome: string;
    cnpj: string;
    endereco: Endereco;
}

class Endereco {
    logradouro: string;
    bairro: string;
    cidade: string;
}

class Item {
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    subtotal: number;
    numeroDocumento: string
    ncm: string
    codigoServico: string
}

class Impostos {
    valores: Record<string, number>;
}

export class Document {
    tipo: TipoDocumento;
    emissor: Pessoa;
    destinatario: Pessoa;
    itens: Item[];
    impostos: Impostos;
    dataEmissao: Date;
    description: string[]
    constructor() {
        this.itens = [];
    }
}

export class NfeBuilder {
    private document: Document;

    constructor() {
        this.resetaInstanciaDocument();
    }

    resetaInstanciaDocument() {
        this.document = new Document();
    }

    dataEmissao(newDate: Date): NfeBuilder {
        this.document.dataEmissao = newDate;
        return this;
    }

    emissor(emissor: Pessoa): NfeBuilder {
        this.document.emissor = emissor;
        return this;
    }

    addItem(descricao: string, quantidade: number, ncm: string): NfeBuilder {
        const item = new Item();
        item.descricao = descricao;
        item.quantidade = quantidade;
        item.ncm = ncm;
        this.document.itens.push(item);
        return this;
    }

    buildInstance(): Document {
        return this.document;
    }
}

export class NfseBuilder {
    private document: Document;

    constructor() {
        this.resetaInstanciaDocument();
    }

    resetaInstanciaDocument() {
        this.document = new Document();
    }

    dataEmissao(newDate: Date): NfseBuilder {
        this.document.dataEmissao = newDate;
        return this;
    }

    emissor(emissor: Pessoa): NfseBuilder {
        this.document.emissor = emissor;
        return this;
    }

    addItem(descricao: string, quantidade: number, codigoServico: string): NfseBuilder {
        const item = new Item();
        item.descricao = descricao;
        item.quantidade = quantidade;
        item.codigoServico = codigoServico;
        this.document.itens.push(item);
        return this;
    }

    buildInstance(): Document {
        return this.document;
    }
}