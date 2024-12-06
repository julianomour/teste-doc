import {
    DataEmissao,
    DocumentoFiscal,
    Pessoa,
    Impostos,
    Item,
    TipoDocumento,
    Total
} from './fiscal-doc';

class DocumentoFiscalBuilder implements DocumentoFiscal {
    tipo: TipoDocumento;
    emissor: Pessoa;
    destinatario: Pessoa;
    itens: Item[];
    impostos: Impostos;
    total: Total;
    dataEmissao: DataEmissao;
    description: string[];
    validations: { status: "error" | "warning"; description: string }[] = []

    constructor() {
        this.tipo = null;
        this.emissor = null;
        this.destinatario = null;
        this.itens = [];
        this.impostos = null;
        this.total = new Total();
        this.dataEmissao = new DataEmissao();
        this.description = [];
    }

    validate(): void {
        throw new Error('Method not implemented.');
    }

    setTipo(tipo: string) {
        this.tipo = new TipoDocumento(tipo);
        return this;
    }

    setEmissor(nome: string, cnpj: string) {
        this.emissor = new Pessoa(nome, cnpj);
        return this;
    }

    setDestinatario(nome: string, cnpj: string) {
        this.destinatario = new Pessoa(nome, cnpj);
        return this;
    }

    addItem(descricao: string, quantidade: number, valorUnitario: number) {
        const item = new Item(descricao, quantidade, valorUnitario);
        this.itens.push(item);
        // this.total.valor += item.subtotal;
        return this;
    }

    setImpostos(impostos: Record<string, number>) {
        this.impostos = new Impostos(impostos);
        return this;
    }

    setDataEmissao(data: Date) {
        this.dataEmissao = new DataEmissao(data);
        return this;
    }

    setTotal(total: number) {
        this.total = new Total(total);
        return this;
    }

    build(): DocumentoFiscal {
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

export class NFeBuilder extends DocumentoFiscalBuilder {

    constructor() {
        super();
        this.tipo = new TipoDocumento("NF-e");
    }


    validate(): void {
        this.validations = [];

        this.validateError(
            { property: this.tipo, name: "Tipo de documento" },
            { property: this.emissor, name: "Emissor" },
            { property: this.destinatario, name: "Destinatário" },
            { property: this.itens, name: "Itens" },
            { property: this.impostos, name: "Impostos" },
            { property: this.impostos?.valores, name: "Valores dos Impostos" },
            { property: this.dataEmissao, name: "Data de emissão" }
        );

        this.validateWarning(
            { property: this.total.valor, name: "Valor total" }
        );

        for (let i = 0; i < this.itens.length; i++) {
            const item = this.itens[i];
            this.validateError(
                { property: item.valorUnitario, name: `Valor Unitário do Item ${i + 1}` },
                { property: item.descricao, name: `Descricao do Item ${i + 1}` },
            );

            this.validateWarning(
                { property: item.quantidade, name: `Quantidade do Item ${i + 1}` },
            );
        }

    }


    build(): DocumentoFiscal {
        this.validate();

        return {
            tipo: this.tipo,
            emissor: this.emissor,
            destinatario: this.destinatario,
            itens: this.itens,
            impostos: this.impostos,
            total: this.total,
            dataEmissao: this.dataEmissao,
            description: this.validations.map(
                (v) => `${v.status.toUpperCase()}: ${v.description}`
            )
        };
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


