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
    cy.contains("Danillo Franklin Leite Lopes");
});

it("Alterar perfil professor", () => {
  cy.get('[href="/conexao/perfil"]').should("exist").click();
  cy.contains("Danillo Franklin Leite Lopes");
  cy.wait(3000);
  cy.get('#categories > .br-input > .br-button > .fas').click();
  cy.contains('label', 'Professor').click();
  cy.wait(500);
  cy.get('.br-input:nth-child(1) > .br-select [aria-label="Exibir lista"]').click();
  cy.get('.br-item:nth-child(13) label').should("exist").click();
  cy.wait(1000)
  cy.get('#input_city').click();
  cy.get('.br-item label').contains('Bocaiúva', { matchCase: false }).click();
  cy.get('#input_institution').click();
  cy.get('#institution .br-item:nth-child(4) label').click();
  cy.get('.mt-3').click();
  cy.get('.row:nth-child(2) > div:nth-child(1) > .br-checkbox:nth-child(2) > label').click();
  cy.get('.row:nth-child(2) > div:nth-child(2) > .br-checkbox:nth-child(2) > label').click();
  cy.get('.mr-1:nth-child(2)').click();
  cy.wait(2000);
  cy.get('.active').click();


});
it("Alterar para perfil Equipe programa", () => {
  cy.get('[href="/conexao/perfil"]').should("exist").click();
  cy.wait(3000);
  cy.get('input#input_categories').click();
  cy.contains('label', 'Equipe do Programa').click();
  cy.get('label[for="DNIT Sede"]').click();
  cy.contains('button', 'Salvar').click();
  cy.wait(2000);
  cy.get('.active').click();

});
});