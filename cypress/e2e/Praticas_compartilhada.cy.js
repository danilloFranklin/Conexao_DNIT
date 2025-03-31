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
    cy.wait(2000);
    cy.get(':nth-child(1) > a > .spotlight-section > .content > .front > .d-flex').should('be.visible');
  });

  it("Acessar prática", () => {
    cy.get('.highlight--item > [href="/conexao/praticas-compartilhadas"]').click();
    validarDescricaoTexto();
    cy.scrollTo(0, 1000);
    cy.get(':nth-child(1) > a > .spotlight-section > .content > .front > .d-flex').should('be.visible').click();
    });

  it.only("Testar busca com resultado EM", () => {
    cy.get('.highlight--item > [href="/conexao/praticas-compartilhadas"]').should("be.visible").click();
    validarDescricaoTexto();
    cy.scrollTo(0, 1000);
    cy.get('#password-id').type("O meio ambiente Krycia");
    cy.get('.mb-3 > label').should("be.visible").click();
    cy.get('.primary').should("exist").click();
    cy.wait(1000);
    cy.get('.text-up-01 > p').contains("O meio ambiente Krycia").should("exist").click();
    
  });

  it("Testar busca sem resultado EM", () => {
    cy.get('.highlight--item > [href="/conexao/praticas-compartilhadas"]').click();
    validarDescricaoTexto();
    cy.scrollTo(0, 1000);
    cy.get('#password-id').type("O meio ambiente Krycia N existe");
    cy.get('.mb-3 > label').should("exist").click();
    cy.get('.primary').should("exist").click();
    cy.get('.text-secondary').contains("Não foi encontrada nenhuma informação!").should("be.visible")
  });

  it("Testar busca com resultado EF", () => {
    cy.get('.highlight--item > [href="/conexao/praticas-compartilhadas"]').click();
    validarDescricaoTexto();
    cy.scrollTo(0, 1000);
    cy.get('#password-id').type("Trânsito em cena: todo mundo tem direito à vida!");
    cy.get('.row > .mb-1 > label').should("exist").click();
    cy.get('.primary').should("exist").click();
    cy.get('.text-up-01 > p').contains("Trânsito em cena: todo mundo tem direito à vida!").should("exist").click();
    cy.go("back"); 
  });

  it("Testar busca sem resultado EF", () => {
    cy.get('.highlight--item > [href="/conexao/praticas-compartilhadas"]').click();
    validarDescricaoTexto();
    cy.scrollTo(0, 1000);
    cy.get('#password-id').type("O meio ambiente Krycia EF não existe");
    cy.get('.row > .mb-1 > label').should("exist").click();
    cy.get('.primary').should("exist").click();
    cy.get('.text-secondary').contains("Não foi encontrada nenhuma informação!").should("be.visible")
  });

});




