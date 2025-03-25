import { pt_BR, faker } from "@faker-js/faker";

describe("Iniciativas", () => {
  const Foto_teste = "Foto_teste.jpg";
  const textocurto = "Automação - " + faker.lorem.words(2);
  const textolongo = faker.lorem.paragraphs(1);
  beforeEach(() => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao"); // Acesse a página antes de setar o localStorage
    cy.viewport(1920, 1080);
    cy.setLocalStorage();
    // Recarrega a página para aplicar os valores do localStorage
    cy.reload();

    // Valida se os dados foram inseridos corretamente
    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
    cy.wait(1000);
  });
  it("Cadastrar iniciativas", () => {
    cy.get("#Iniciativas svg").click();
    cy.get('[href="/conexao/iniciativas/enviar"]:nth-child(1)').click();
    cy.get("#title").type(textocurto);
    cy.get("#year .fas").click();
    cy.get("#year .br-item:nth-child(1) label").click();
    cy.get("#idDiscipline .fas").click();
    cy.get("#idDiscipline .br-item:nth-child(1) label").click();
    cy.get("#trafficApproach .fas").click();
    cy.get("#trafficApproach .br-item:nth-child(1) label").click();
    cy.get("#description").type(textolongo);
    
    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg").should("be.visible");

    cy.get(".mt-0").click();
    cy.contains(textocurto).should("be.visible");
    cy.contains(textocurto).click();
    cy.contains(textocurto).should("be.visible");
    cy.contains(textolongo).should("be.visible");
    cy.contains("Foto_teste.jpg").should("be.visible");
    cy.get(".fa-home").click();
    cy.get(".text-search-activities > h3").should("be.visible");
  });
  it("Editar Iniciativa", () => {
    cy.get("#Iniciativas svg").click();
    cy.get(":nth-child(1) > :nth-child(5) > .tooltip-container > .br-button > .fas").click();
    cy.get("#title").clear();
    cy.get("#title").type("Edição " + textocurto);
    cy.get(".mt-0").click();
    cy.contains(textocurto).should("be.visible");
    cy.contains(textocurto).click();
    cy.contains(textocurto).should("be.visible");
    cy.contains(textolongo).should("be.visible");
    cy.contains("Foto_teste.jpg").should("be.visible");
    cy.get(".fa-home").click();
    cy.get(".text-search-activities > h3").should("be.visible");
  });
});
