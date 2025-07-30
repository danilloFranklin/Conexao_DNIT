import { faker } from "@faker-js/faker";
describe("Equipe Parceira", () => {
  {
    const Foto_teste = "Foto_teste.jpg";
    const fileName = "lista_equipe_parceira.csv"; // Nome do arquivo esperado
    const filePath = `cypress/downloads/${fileName}`;
    const textocurto = `Automação - ${faker.lorem.words(2)}`;
    const telefoneValido = faker.phone.number("(##) #########");
    const emailValido = faker.internet.email();
    const numeroAleatorio = Math.floor(10000000 + Math.random() * 90000000);
    const cepValido = "76995970";
    const textolongo = faker.lorem.paragraphs(1);

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
      ccy.get('a[href="/conexao/gestao/equipe-parceira"]').click();
      cy.contains('td', 'Steve Rogers').should("be.visible");
    });
    it("Filtrar e Limpar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      ccy.get('a[href="/conexao/gestao/equipe-parceira"]').click();
      cy.contains('td', 'Steve Rogers').should("be.visible");
      cy.get("input#input_federativeUnit").click();
      cy.contains("label", "MG").click();
      cy.get("input#input_city").click();
      cy.contains("label", "Bocaiúva").click();
      cy.get('label[for="active"]').click();
      cy.contains("button", "Buscar").click();
      cy.contains("td", "Samara GOL").should("be.visible");
    });
    it("Buscar e Limpar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      ccy.get('a[href="/conexao/gestao/equipe-parceira"]').click();
      cy.contains('td', 'Steve Rogers').should("be.visible");
      cy.get("input#searchbox").type("Samara GOL");
      cy.contains("button", "Buscar").click();
      cy.contains("td", "Samara GOL").should("be.visible");
      cy.contains("button", "Limpar").click();
      cy.contains('td', 'Steve Rogers').should("be.visible");
    });
    it("Alterar Perfil", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      ccy.get('a[href="/conexao/gestao/equipe-parceira"]').click();
      cy.contains('td', 'Steve Rogers').should("be.visible");
      cy.get("input#searchbox").type("Samara GOL");
      cy.contains("button", "Buscar").click();
      cy.contains("td", "Samara GOL").should("be.visible");
      cy.get('i[aria-describedby="tooltipEditar"]').click();
      cy.wait(700);
      cy.get('input#input_userProfile').click();
      cy.contains("label", "AA - teste teste").click();
      cy.get('button[type="submit"]').click();
      cy.contains("td", "AA - teste teste")
        .closest("tr")
        .find('td[data-th*="Perfil"]')
        .should("be.visible");
      cy.get('i[aria-describedby="tooltipEditar"]').click();
      cy.wait(700);
      cy.get('input#input_userProfile').click();
      cy.contains("label", "Professor").click();
      cy.get('button[type="submit"]').click();
      cy.contains("td", "Professor")
        .closest("tr")
        .find('td[data-th*="Perfil"]')
        .should("be.visible");
    });
    it("Inativar e ativar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      ccy.get('a[href="/conexao/gestao/equipe-parceira"]').click();
      cy.contains('td', 'Steve Rogers').should("be.visible");
      cy.get("input#searchbox").type("José da Silva");
      cy.contains("button", "Buscar").click();
      cy.wait(2000);
      cy.get("i.fa-link").click();
      cy.wait(2000);
      cy.get("input#searchbox").clear().type("José da Silva");
      cy.contains("button", "Buscar").click();
      cy.wait(800);
      cy.get("i.fa-link").click();
      cy.wait(1500);
      cy.get("input#searchbox").clear().type("José da Silva");
      cy.contains("button", "Buscar").click();

      cy.get('i[aria-describedby="tooltipEditar"]').click();
      cy.wait(700);
      cy.get('input#input_userProfile').click();
      cy.contains("label", "AA - teste teste").click();
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
      cy.get("input#searchbox").clear().type("José da Silva");
      cy.contains("button", "Buscar").click();
      cy.contains('span', 'Ativo').eq(0).should('be.visible');
    });
    it("Baixar CSV", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      ccy.get('a[href="/conexao/gestao/equipe-parceira"]').click();
      cy.contains('td', 'Steve Rogers').should("be.visible");

      cy.get("div.actions-trigger button").click();

      cy.readFile(filePath, { timeout: 90000 }).should("exist");

      // Faz o parse do CSV e valida se existe "José da Silva" na coluna "Nome"
      cy.task("parseCsv", { filePath }).then((rows) => {
        // Loga os dados lidos (opcional, para debug)

        const registroEncontrado = rows.find((row) =>
          row["Nome"]?.includes("José da Silva")
        );

        expect(
          registroEncontrado,
          'José da Silva não encontrado na coluna "Nome"'
        ).to.exist;
      });

      // Exclui o arquivo após validação
      cy.task("deleteFile", filePath).should("equal", true);
    });
  }
});
