import { faker } from "@faker-js/faker";
describe("Superintendências Regionais", () => {
  {
    const fileName = "superintendencias_regionais.csv"; // Nome do arquivo esperado
    const filePath = `cypress/downloads/${fileName}`;
    const textocurto = `Automação - ${faker.lorem.words(2)}`;
    const telefoneValido = faker.phone.number("###########");
    const emailValido = faker.internet.email();

    beforeEach(() => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/"); // Acesse a página antes de setar o localStorage
      cy.setLocalStorage();
      // Recarrega a página para aplicar os valores do localStorage
      cy.reload();

      // Valida se os dados foram inseridos corretamente
      cy.window().its("localStorage.session").should("exist");
      cy.window().its("localStorage.user").should("exist");
    });
    it("acessar lista", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.contains("span", "Superintendências Regionais").click();
      cy.contains("td", "DANILLO FRANKLIN LEITE LOPES");
    });
    it("Baixar e validar o CSV", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.contains("span", "Superintendências Regionais").click();
      cy.contains("td", "DANILLO FRANKLIN LEITE LOPES");
      cy.get("div.actions-trigger button").click();

      cy.readFile(filePath, { timeout: 10000 }).should("exist");

      // Faz o parse do CSV e valida se existe "SUPERINTENDÊNCIA REGIONAL DO DNIT NO ESTADO DA BAHIA" na coluna "Unidade Local"
      cy.task("parseCsv", { filePath }).then((rows) => {
        // Loga os dados lidos (opcional, para debug)
        const registroEncontrado = rows.find((row) =>
          row["Superintendência Regional"]?.includes(
            "DANILLO FRANKLIN LEITE LOPES"
          )
        );

        expect(
          registroEncontrado,
          'SUPERINTENDÊNCIA REGIONAL DO DNIT NO ESTADO DA BAHIA não encontrado na coluna "Unidade Local"'
        ).to.exist;
      });

      // Exclui o arquivo após validação
      // cy.task("deleteFile", filePath).should("equal", true);
    });
    it("Campo de busca", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.contains("span", "Superintendências Regionais").click();
      cy.contains(
        "td",
        "SUPERINTENDÊNCIA REGIONAL DO DNIT NO ESTADO DA BAHIA"
      );
      cy.get("input#searchbox").type(
        "SUPERINTENDÊNCIA REGIONAL DO DNIT NO ESTADO DA BAHIA"
      ); 
      cy.contains("button", "Buscar").click();
      cy.get('td[data-th="Superintendência Regional"]').should("be.visible");
    });
    it("Limpar busca", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.contains("span", "Superintendências Regionais").click();
      cy.contains(
        "td",
        "SUPERINTENDÊNCIA REGIONAL DO DNIT NO ESTADO DE MINAS GERAIS"
      );
      cy.get("input#searchbox").type(
        "SUPERINTENDÊNCIA REGIONAL DO DNIT NO ESTADO DE MINAS GERAIS"
      );
      cy.contains("button", "Buscar").click();
      cy.get('td[data-th="Superintendência Regional"]').should("be.visible");
      cy.contains("button", "Limpar").click();
      cy.contains(
        "td",
        "CADASTRO DE SUPERINTENDÊNCIA REGIONAL ESTADUAL PRA EXCLUIR"
      ).should("be.visible");
    });
    it("Cadastrar e excluir", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.contains("span", "Superintendências Regionais").click();
      cy.contains("td", "DANILLO FRANKLIN LEITE LOPES");
      cy.get("div.justify-content-between button").click();
      cy.get("input#name").type(textocurto);
      cy.get('input[type="text"]').eq(1).type(telefoneValido);
      cy.get("input#email").type(emailValido);
      cy.get("input#zipCode").type("76995970");
      cy.contains('p', 'Logradouro*: Avenida Itália Cautiero Franco').should('be.visible');
      cy.get("input#number").type(500);
      cy.wait(1500);
      cy.get('button[value="save"]').click();
      cy.get("input#searchbox").type(textocurto);
      cy.contains("button", "Buscar").click();
      cy.contains('td', textocurto.toUpperCase()).closest('tr').find('td[data-th*="Superintendência Regional"]').should("be.visible");
      cy.get("i.fa-trash").click();
      cy.contains("button", "Sim").click();
      cy.contains("button", "Limpar").click();
      cy.get("input#searchbox").type(textocurto);
      cy.contains("button", "Buscar").click();
      cy.contains("Nenhum registro encontrado.").should("be.visible");
      cy.contains("button", "Limpar").click();
      cy.contains("td", "DANILLO FRANKLIN LEITE LOPES");
    });
  }
});
