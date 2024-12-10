import { DocumentoFiscalFactory } from '../src/factory';

try {
    const nfe = DocumentoFiscalFactory.CriarFactory("NF-e");

    const emissor = {
        nome: "Empresa X",
        cnpj: "12.345.678/0001-99"
    }
    const destinatario = {
        nome: "Cliente Y",
        cnpj: "98.765.432/0001-00"
    }
    const item = {
        quantidade: 2,
        valorUnitario: 1,
        descricao: "Produto A",
        subtotal: 1
    }


    nfe.setEmissor(emissor)
    nfe.setDestinatario(destinatario)
    nfe.addItem(item.descricao, item.quantidade, item.valorUnitario, item.subtotal)
    nfe.setTotal(item.subtotal)

    console.log(nfe.getDocumentoFiscal());
    // console.log(nfe.getValidationMessages())
} catch (error) {
    console.error("Erro ao criar documento fiscal:", error.message);
}
