import { faker } from "@faker-js/faker";

describe("Cursos", () => {
  const fileName = "home.pdf"; // Nome do arquivo esperado
  const filePath = `cypress/downloads/${fileName}`;
  const textoAleatorio = faker.lorem.sentence();

  beforeEach(() => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao");
    cy.viewport(1920, 1080);
    cy.setLocalStorage();
    cy.reload();

    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
  });

  it("Criar comentario", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get('.menu > [href="/conexao/cursos"]').click();
    cy.contains(
      "Nesta área, você acessa materiais de formação completos, como capacitações para educadores e cursos livres relacionados ao tema de trânsito."
    ).should("be.visible");
    cy.contains("Teste Automação - Não excluir").click();
    cy.scrollTo(0, 1275);
    cy.get("#txtComment").type(textoAleatorio);
    cy.get(".mt-sm-0").click();
    cy.contains(textoAleatorio).should("be.visible");
  });

  it("Excluir comentario", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get('.menu > [href="/conexao/cursos"]').click();

    cy.contains(
      "Nesta área, você acessa materiais de formação completos, como capacitações para educadores e cursos livres relacionados ao tema de trânsito."
    ).should("be.visible");
    cy.contains("Teste Automação - Não excluir").click();
    cy.scrollTo(0, 1275);
    cy.contains(textoAleatorio).should("be.visible");
    cy.get(
      ":nth-child(9) > :nth-child(1) > .content > .row > .br-button > img"
    ).click();
    cy.contains(textoAleatorio).should("not.exist");
  });

  it("Baixar arquivo", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get('.menu > [href="/conexao/cursos"]').click();
    cy.contains(
      "Nesta área, você acessa materiais de formação completos, como capacitações para educadores e cursos livres relacionados ao tema de trânsito."
    ).should("be.visible");
    cy.contains("Teste Automação - Não excluir").click();
    cy.scrollTo(0, 1275);
    cy.get(".clickable-item").click();
    cy.readFile(filePath, { timeout: 10000 }).should("exist");
    cy.task("deleteFile", filePath).should("equal", true);
  });

  it("Acessar Curso", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.wait(1000);
    cy.get('.menu > [href="/conexao/cursos"]').click();
    cy.wait(1000);
    cy.contains("Teste Automação - Não excluir").click();
    cy.scrollTo(0, 1275);
    cy.get('[href="https://conexao-dnit-hom.labtrans.ufsc.br/conexao/cursos/2"]').should("have.attr", "target", "_blank").invoke("removeAttr", "target").click();
    cy.url().should("include", "https://conexao-dnit-hom.labtrans.ufsc.br/conexao/cursos/2");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });
});
