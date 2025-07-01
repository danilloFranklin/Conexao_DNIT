import { faker } from "@faker-js/faker";
describe("Unidades Locais", () => {
  {
    const fileName = "lista_unidades_locais.csv"; // Nome do arquivo esperado
    const filePath = `cypress/downloads/${fileName}`;
    const textocurto = `Automação Unidade Local - ${faker.lorem.words(2)}`;
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
      cy.get('a[href="/conexao/gestao/unidade-local"] span').click();
      cy.contains("td", "DANILLO TESTE 30/08/2023");
    });
    it.only("baixar e validar o CSV", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/unidade-local"] span').click();
      cy.contains("td", "DANILLO TESTE 30/08/2023");
      cy.get("i.fa-download").click();

      // baixar, validar e excluir arquivo
      cy.readFile(filePath, { timeout: 10000 }).should("exist");

      // Faz o parse do CSV e valida se existe "Danillo teste 30/08/2023" na coluna "Unidade Local"
      cy.task("parseCsv", { filePath }).then((rows) => {
        // Loga os dados lidos (opcional, para debug)
        console.log(rows);

        const registroEncontrado = rows.find((row) =>
          row["Unidade Local"]?.includes("Danillo teste 30/08/2023")
        );

        expect(registroEncontrado, 'Danillo teste 30/08/2023 não encontrado na coluna "Unidade Local"').to.exist;
      });
      // Exclui o arquivo após validação
      cy.task("deleteFile", filePath).should("equal", true);
    });
    it("Campo de busca", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/unidade-local"] span').click();
        cy.contains(
          "td", "DANILLO TESTE 30/08/2023"
        );
        cy.get("input#searchbox").type(
          "UNIDADE LOCAL DE CARATINGA/MG"
        );
        cy.contains("button", "Buscar").click();
        cy.get('td[data-th="Unidade Local"]').should("be.visible");
      });
      it("Limpar Buscas", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/unidade-local"] span').click();
        cy.contains(
          "td", "DANILLO TESTE 30/08/2023"
        );
        cy.get("input#searchbox").type(
          "UNIDADE LOCAL DE CARATINGA/MG"
        );
        cy.contains("button", "Buscar").click();
        cy.get('td[data-th="Unidade Local"]').contains('UNIDADE LOCAL DE CARATINGA/MG').should("be.visible");
        cy.contains('button', 'Limpar').click();
        cy.contains(
            "td", "DANILLO TESTE 30/08/2023"
          );
      });
      
      it("Cadastrar e excluir UL ", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/unidade-local"] span').click();
        cy.contains("td", "DANILLO TESTE 30/08/2023");
        cy.get('i.fa-plus').click();
        cy.wait(2000);
        cy.get('div[id="regionalSuperintendence"] i').click();
        cy.wait(1500);
        cy.contains('label', 'SUPERINTENDÊNCIA REGIONAL DO DNIT NO ESTADO DE RONDÔNIA').click();
        cy.get('input#identification').type(textocurto);
        cy.get('input#input_roads').click();
        cy.contains('label', 'BR-174').click();
        cy.contains('label', 'BR-364').click();
        cy.get('input#input_cities').type('Corumbiara')
        cy.contains('label', 'Corumbiara').click();
        cy.get('input.medium').eq(1).type(telefoneValido);
        cy.get('input#email').type(emailValido);
        cy.get('input#zipCode').type("76995970")
        cy.contains('p', 'Logradouro*: Avenida Itália Cautiero Franco').should('be.visible');
        cy.get('input#number').type('20')
        cy.get('button[value="save"]').click('')
        cy.get('input#searchbox').type(textocurto);
        cy.contains('button', 'Buscar').click();
        cy.wait(1500);
        cy.contains("td", textocurto.toUpperCase());
        cy.get('i.fa-trash').click();
        cy.contains('button', 'Sim').click();
        cy.get('input#searchbox').clear().type(textocurto);
        cy.contains('button', 'Buscar').click();
        cy.wait(1500);
        cy.get('div[data-search="data-search"] td').contains('Nenhum registro encontrado');


      });
  }
});
