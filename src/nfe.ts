import { TipoDocumento, Pessoa, Item, Impostos, Total, DataEmissao, Endereco, NFe } from './fiscal-doc';


export class NFeFactory implements NFe {

    tipo: TipoDocumento;
    emissor: Pessoa;
    destinatario: Pessoa;
    itens: Item[];
    impostos: Impostos;
    total: Total;
    dataEmissao: DataEmissao;
    description: string[]


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

    setEmissor(pessoa: { nome: string, cnpj: string, endereco: Endereco }) {
        this.emissor.nome = pessoa.nome;
        this.emissor.cnpj = pessoa.cnpj;
        this.emissor.endereco = pessoa.endereco;

        this.emissor.validateError(
            { property: this.emissor.nome, name: "Nome do Emissor" },
            { property: this.emissor.cnpj, name: "CNPJ do Emissor" },
        )

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

    addItem(descricao: string, quantidade: number, valorUnitario: number) {
        let document_item = new Item();
        document_item.descricao = descricao;
        document_item.quantidade = quantidade;
        document_item.valorUnitario = valorUnitario;
        document_item.subtotal = valorUnitario * quantidade;
        this.itens.push(document_item)
        this.total.valor += document_item.subtotal;
        return this;
    }

    validate() {
        throw new Error('Method not implemented.');
    }

    emitir() {
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
}
