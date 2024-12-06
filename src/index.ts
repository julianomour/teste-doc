import { DocumentoFiscalFactory } from '../src/factory';

try {
    const builder = DocumentoFiscalFactory.criarBuilder("NF-e");

    const documentoFiscal = builder
        .setEmissor("Empresa X", "12.345.678/0001-99")
        .setDestinatario("Cliente Y", "98.765.432/0001-00")
        .addItem("Produto A", 2, null)
        .addItem(null, 1, 100.0)
        .build();

    console.log(documentoFiscal);
    // console.log(builder.getValidationMessages())
} catch (error) {
    console.error("Erro ao criar documento fiscal:", error.message);
}
