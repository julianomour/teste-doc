class Validation {
    validations: { status: "error" | "warning"; description: string }[] = []

    validateError(...properties: { property: any; name: string }[]): void {
        properties.forEach(({ property, name }) => {
            if (!property || (Array.isArray(property) && property.length === 0)) {
                this.validations.push({
                    status: "error",
                    description: `${name} é obrigatório.`,
                });
            }
        });
    }


    validateWarning(...properties: { property: any; name: string }[]): void {
        properties.forEach(({ property, name }) => {
            if (!property || (Array.isArray(property) && property.length === 0)) {
                this.validations.push({
                    status: "warning",
                    description: `${name} é opcional, mas recomendado.`,
                });
            }
        });
    }
}
export interface ValidateDocument extends Validation {
    validate(): void;
}

export class TipoDocumento {
    tipo: string;

    constructor(tipo = null) {
        this.tipo = tipo;
    }
}

export class Pessoa {
    nome: string;
    cnpj: string;

    constructor() {
    }
}

export class Item {
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    subtotal: number;

    constructor() { }
}

export class Impostos {
    valores: Record<string, number>;

    constructor() { }
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


export interface DocumentFactory {
    tipo: TipoDocumento;
    emissor: Pessoa;
    destinatario: Pessoa;
    itens: Item[];
    impostos: Impostos;
    total: Total;
    dataEmissao: DataEmissao;
    description: string[];
}

export class NfeFactory implements DocumentFactory {
    tipo: TipoDocumento;
    emissor: Pessoa;
    destinatario: Pessoa;
    itens: Item[];
    impostos: Impostos;
    total: Total;
    dataEmissao: DataEmissao;
    description: string[];

    constructor() {
        this.tipo = new TipoDocumento("NF-e");
        this.emissor = new Pessoa();
        this.destinatario = new Pessoa();
        this.itens = [];
        this.impostos = new Impostos();
        this.total = new Total();
        this.dataEmissao = new DataEmissao();
        this.description = [];
    }

    setEmissor(pessoa: { nome: string, cnpj: string }) {
        this.emissor.nome = pessoa.nome;
        this.emissor.cnpj = pessoa.cnpj;
        return this;
    }

    setDestinatario(pessoa: { nome: string, cnpj: string }) {
        this.destinatario.nome = pessoa.nome;
        this.destinatario.cnpj = pessoa.cnpj;
        return this;
    }
    setImpostos(impostos: Record<string, number>) {
        this.impostos.valores = impostos;
        return this;
    }


    setTotal(total: number) {
        this.total = new Total(total);
        return this;
    }

    addItem(descricao: string, quantidade: number, valorUnitario: number, subtotal: number) {
        let document_item = new Item();
        document_item.descricao = descricao;
        document_item.quantidade = quantidade;
        document_item.valorUnitario = valorUnitario;
        document_item.subtotal = subtotal;
        this.itens.push(document_item)
        this.total.valor += document_item.subtotal;
        return this;
    }

    getDocumentoFiscal() {
        return {
            tipo: this.tipo,
            emissor: this.emissor,
            destinatario: this.destinatario,
            itens: this.itens,
            impostos: this.impostos,
            total: this.total,
            dataEmissao: this.dataEmissao,
            description: this.description,
        };
    }

    validate(): void {
        throw new Error('Method not implemented.');
    }
}
