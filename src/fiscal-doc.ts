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


    requireOneOf(properties: { property: any; name: string }[]): void {
        const has_some_property = properties.some(
            ({ property }) => property && (!Array.isArray(property) || property.length > 0)
        );

        if (!has_some_property) {
            const props = properties.map(({ name }) => name).join(" ou ");
            this.validations.push({
                status: "error",
                description: `At least one (${props}) is required.`,
            });
        }
    }

    recommendOneOf(properties: { property: any; name: string }[]): void {
        const has_some_property = properties.some(
            ({ property }) => property && (!Array.isArray(property) || property.length > 0)
        );

        if (!has_some_property) {
            const props = properties.map(({ name }) => name).join(" ou ");
            this.validations.push({
                status: "warning",
                description: `is Recommended at least one (${props}).`,
            });
        }
    }


    getValidationMessages() {
        return this.validations.reduce(
            (acc, v) => {
                acc[v.status].push(v.description);
                return acc;
            },
            { error: [] as string[], warning: [] as string[] }
        );
    }

    isValid(): boolean {
        return !this.validations.some((v) => v.status === "error");
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

export class Pessoa extends Validation {
    nome: string;
    cnpj: string;
    endereco: Endereco;

    constructor() {
        super();
        this.endereco = new Endereco();
    }
}

export class Endereco {
    logradouro: string;
    bairro: string;
    cidade: string;
    codigo: string


    isAforeignAddress(): boolean {
        return this.codigo === '1058';
    }
}

export class Item {
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    subtotal: number;
    numero_documento: string

}

export class Impostos {
    valores: Record<string, number>;
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
    emitir(): void;
}

export interface NFe extends DocumentoFiscal {
    tipo: TipoDocumento;
    emissor: Pessoa;
    destinatario: Pessoa;
    itens: Item[];
    impostos: Impostos;
    total: Total;
    dataEmissao: DataEmissao;
    description: string[];

    setEmissor(pessoa: { nome: string, cnpj: string, endereco: Endereco }): void;
    setDestinatario(pessoa: { nome: string, cnpj: string }): void;
    setImpostos(impostos: Record<string, number>): void;
    setTotal(total: number): void;
    addItem(descricao: string, quantidade: number, valorUnitario: number)
}


export interface NFse extends DocumentoFiscal {
    tipo: TipoDocumento;
    emissor: Pessoa;
    destinatario: Pessoa;
    itens: Item[];
    impostos: Impostos;
    total: Total;
    dataEmissao: DataEmissao;
    description: string[];

    setEmissor(pessoa: { cnpj: string, endereco: Endereco }): void;
    setDestinatario(pessoa: { cnpj: string }): void;
    setImpostos(impostos: Record<string, number>): void;
    setTotal(total: number): void;
    addItem(descricao: string, quantidade: number, valorUnitario: number)
}
