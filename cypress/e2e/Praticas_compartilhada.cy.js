import { pt_BR, faker } from "@faker-js/faker";

describe("Práticas Compartilhadas", () => {
  const Foto_teste = "Foto_teste.jpg";
  const textocurto = "Automação - " + faker.lorem.words(2);
  const textolongo = faker.lorem.paragraphs(1);

  function validarDescricaoTexto() {
    cy.get(".text-description > p:nth-child(1)")
      .contains(
        "Nesta área, você poderá conhecer as práticas que estão sendo realizadas por professores das diferentes escolas do Brasil, utilizando as atividades pedagógicas transversais de Educação para o Trânsito do Programa Conexão DNIT."
      )
      .should("be.visible");
  }

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao");
    
    cy.setLocalStorage();
    cy.reload(); // Recarrega para aplicar o localStorage

    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
    cy.wait(1000);
  });

  it("Visualizar lista", () => {
    cy.scrollTo(0, 1000);
    cy.get('.highlight--item > [href="/conexao/praticas-compartilhadas"]').click();
    validarDescricaoTexto();
    wait(2000);
    cy.get(':nth-child(1) > a > .spotlight-section > .content > .front > .d-flex').should('be.visible');
  });

  it.only("Acessar prática", () => {
    cy.get('.highlight--item > [href="/conexao/praticas-compartilhadas"]').click();
    validarDescricaoTexto();
    cy.scrollTo(0, 1000);
    cy.get(':nth-child(1) > a > .spotlight-section > .content > .front > .d-flex').should('be.visible').click();
    cy.window().then((win) => {
      win.close();
    });

  it("Testar busca com resultado", () => {
    cy.get("#Iniciativas svg").click();
    cy.get(":nth-child(1) > :nth-child(5) > .tooltip-container > .br-button > .fas").click();
    cy.get("#title").clear().type("Edição " + textocurto);
    cy.get(".mt-0").click();

    cy.contains(textocurto).should("be.visible").click();
    cy.contains(textolongo).should("be.visible");
    cy.contains(Foto_teste).should("be.visible");

    cy.get(".fa-home").click();
    cy.get(".text-search-activities > h3").should("be.visible");
  });

  it("Testar busca sem resultado", () => {
    cy.get("#Iniciativas svg").click();
    cy.get(":nth-child(1) > :nth-child(5) > .tooltip-container > .br-button > .fas").click();
    cy.get("#title").clear().type("TextoQueNaoExiste123");
    cy.get(".mt-0").click();

    cy.contains("Nenhum resultado encontrado").should("be.visible");

    cy.get(".fa-home").click();
    cy.get(".text-search-activities > h3").should("be.visible");
  });
});
});


