import { faker } from "@faker-js/faker";
describe("Instituições de Ensino", () => {
  {
    const fileName = "lista_instituicoes.csv"; // Nome do arquivo esperado
    const filePath = `cypress/downloads/${fileName}`;
    const textocurto = `Automação - ${faker.lorem.words(2)}`;
    const telefoneValido = faker.phone.number("(##) #########");
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
      cy.get('a[href="/conexao/gestao/instituicoes"] span').click();
      cy.contains("td", "0000001 INSTITUIÇÃO DE ENSINO ATOMATIZADO").should(
        "be.visible"
      );
    });
    it("buscar e limpar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/instituicoes"] span').click();
      cy.contains("td", "0000001 INSTITUIÇÃO DE ENSINO ATOMATIZADO").should(
        "be.visible"
      );
      cy.get("input#searchbox").type("0000001 A ESCOLA TESTE. KRYCIA 04/12");
      cy.contains("button", "Buscar").click();
      cy.get('td[data-th="Instituição"]')
        .contains("0000001 A ESCOLA TESTE. KRYCIA 04/12")
        .should("be.visible");
      cy.contains("button", "Limpar").click();
      cy.contains("td", "0000001 INSTITUIÇÃO DE ENSINO ATOMATIZADO").should(
        "be.visible"
      );
    });
    it("Filtrar e limpar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/instituicoes"] span').click();
      cy.contains("td", "0000001 INSTITUIÇÃO DE ENSINO ATOMATIZADO").should(
        "be.visible"
      );
      cy.get("input#input_state").click().type("MG");
      cy.contains("label", "MG").click();
      cy.wait(1000);
      cy.get("input#input_region").type("Montes Claros");
      cy.wait(3000);
      cy.get('label[for*="region_"]').click();
      cy.get("input#input_city").click();
      cy.wait(1000);
      cy.contains("label", "Bocaiúva").click();
      cy.wait(1000);
      cy.contains("label", "É participante do Conexão DNIT").click();
      cy.contains("label", "Atuação do DNIT").click();
      cy.contains("button", "Buscar").click();
      cy.get('td[data-th="Instituição"]')
        .contains("APAE DE BOCAIUVA LTDA")
        .should("be.visible");
      cy.contains("button", "Limpar").click();
      cy.contains("td", "0000001 INSTITUIÇÃO DE ENSINO ATOMATIZADO").should(
        "be.visible"
      );
    });
    it("Baixar CSV", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/instituicoes"] span').click();
      cy.contains("td", "0000001 INSTITUIÇÃO DE ENSINO ATOMATIZADO").should(
        "be.visible"
      );
      cy.get("input#input_state").click().type("MG");
      cy.contains("label", "MG").click();
      cy.wait(1000);
      cy.get("input#input_region").type("Montes Claros");
      cy.wait(3000);
      cy.get('label[for*="region_"]').click();
      cy.get("input#input_city").click();
      cy.wait(1000);
      cy.contains("label", "Bocaiúva").click();
      cy.wait(1000);
      cy.contains("button", "Buscar").click();

      cy.get("div.actions-trigger button").click();

      cy.readFile(filePath, { timeout: 90000 }).should("exist");

      // Faz o parse do CSV e valida se existe "EE DOUTOR ODILON LOURES" na coluna "Identificação da Instituição de Ensino"
      cy.task("parseCsv", { filePath }).then((rows) => {
        // Loga os dados lidos (opcional, para debug)
        console.log(rows);

        const registroEncontrado = rows.find((row) =>
          row["Identificação da Instituição de Ensino"]?.includes(
            "EE DOUTOR ODILON LOURES"
          )
        );

        expect(
          registroEncontrado,
          'EE DOUTOR ODILON LOURES não encontrado na coluna "Unidade Local"'
        ).to.exist;
      });

      // Exclui o arquivo após validação
      cy.task("deleteFile", filePath).should("equal", true);
    });
    it.only("Editar e salvar", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/instituicoes"] span').click();
        cy.contains("td", "0000001 INSTITUIÇÃO DE ENSINO ATOMATIZADO").should(
          "be.visible"
        );
          cy.get('i[aria-describedby="tooltipEditar"]').eq(1).click();
          cy.get('input#identification').clear().type(textocurto);
          cy.contains('button', 'Proxima').click();
          cy.get('button[type="submit"]').click();
          cy.get("input#searchbox").clear().type(textocurto);
          cy.contains("button", "Buscar").click();
          cy.contains(textocurto.toUpperCase()).should("be.visible");
          cy.get('i[aria-describedby="tooltipEditar"]').click();
          cy.get('input#identification').clear().type("0000001 A ESCOLA TESTE. KRYCIA 04/12");
          cy.contains('button', 'Proxima').click();
          cy.get('button[type="submit"]').click();
          cy.get("input#searchbox").type('0000001 A ESCOLA TESTE. KRYCIA 04/12');
          cy.contains("button", "Buscar").click();
          cy.get('td[data-th="Instituição"]')
          .contains('0000001 A ESCOLA TESTE. KRYCIA 04/12')
          .should("be.visible");


        

        
      });
  }
});
