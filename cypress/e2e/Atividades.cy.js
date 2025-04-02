import { faker } from "@faker-js/faker";

describe("Cursos", () => {
  const fileName = "home.pdf"; // Nome do arquivo esperado
  const filePath = `cypress/downloads/${fileName}`;
  const textoAleatorio = faker.lorem.sentence();

  beforeEach(() => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao");
    cy.setLocalStorage();
    cy.reload();

    // Verifica se a sessão e o usuário estão armazenados
    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
  });

  it("Buscar atividades do EF", () => {
    cy.get("#elementarySchool > #elementarySchool").should("be.visible").click();
    cy.get(".wrapper > .br-button").should("be.visible").click();
    cy.scrollTo(0, 77);
    cy.get(".mb-3:nth-child(2) .br-button").should("be.visible").click();
    cy.get(".mb-5:nth-child(4) > .br-button").should("be.visible").click();
    cy.scrollTo(0, 456);
  });

  it("Buscar atividade do EM", () => {
    cy.get("#highSchool > #highSchool").should("be.visible").click();
    cy.wait(1500);
    cy.get(".mt-4 .small:nth-child(1)").should("be.visible").click();
    cy.wait(1000)
    cy.get('[style="font-size: 15px; font-weight: bold; background-color: rgb(200, 219, 255);"]').should("be.visible").click();
    cy.get('#tabSent > form > .mb-5 > .br-button').should("be.visible").click();
  });
});
