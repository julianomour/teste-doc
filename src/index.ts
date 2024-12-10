import { DocumentoFiscalConcretaFactory, DocumentoFiscalFactory } from '../src/factory';

try {
    const factory = new DocumentoFiscalConcretaFactory();
    const nfe = factory.criarNFe();


    const emissor = {
        nome: null,
        cnpj: "12.345.678/0001-99",
        endereco: {
            logradouro: "Rua A",
            bairro: "Centro",
            cidade: "Cidade X"
        }
    }
    const destinatario = {
        nome: "Cliente Y",
        cnpj: "98.765.432/0001-00"
    }
    const item = {
        quantidade: 2,
        valorUnitario: 1,
        descricao: "Produto A"
    }


    nfe.setEmissor(emissor)
    nfe.setDestinatario(destinatario)
    nfe.addItem(item.descricao, item.quantidade, item.valorUnitario)

    console.log(nfe);
} catch (error) {
    console.error("Erro ao criar documento fiscal:", error.message);
}
