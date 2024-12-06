export interface ValidateDocument {
    validate(): void;
}

export class TipoDocumento {
    tipo: string;

    constructor(tipo: string) {
        this.tipo = tipo;
    }
}

export class Pessoa {
    nome: string;
    cnpj: string;

    constructor(nome: string, cnpj: string) {
        this.nome = nome;
        this.cnpj = cnpj;
    }
}

export class Item {
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    subtotal: number;

    constructor(descricao: string, quantidade: number, valorUnitario: number) {
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
        this.subtotal = quantidade * valorUnitario;
    }
}

export class Impostos {
    valores: Record<string, number>;

    constructor(valores: Record<string, number>) {
        this.valores = valores;
    }
}

export class DataEmissao {
    data: Date;

    constructor(data: Date = new Date()) {
        this.data = data;
    }
}

export class Total {
    valor: number;

    constructor(valor: number = 0) {
        this.valor = valor;
    }
}


export interface DocumentoFiscal {
    tipo: TipoDocumento;
    emissor: Pessoa;
    destinatario: Pessoa;
    itens: Item[];
    impostos: Impostos;
    total: Total;
    dataEmissao: DataEmissao;
    description: string[];

    // validateError(): void
    // validateWarning(): void
}

