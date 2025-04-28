import { pt_BR, faker } from "@faker-js/faker";

describe("Perfil", () => {
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
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao");
    
    cy.setLocalStorage();
    cy.reload(); // Recarrega para aplicar o localStorage

    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
    cy.wait(1000);
  });

  it("Acessar perfil", () => {
    cy.get('[href="/conexao/perfil"]').should("exist").click();
    cy.contains("Danillo Franklin Leite Lopes")
});
});