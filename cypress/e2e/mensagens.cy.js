import { pt_BR, faker } from "@faker-js/faker";

const timeoutValue = Cypress.config('defaultCommandTimeout');
const baseUrl = Cypress.env('baseUrl') || "https://conexao-dnit-hom.labtrans.ufsc.br/conexao";

export const Foto_teste = "Foto_teste.jpg";

// Função para fazer login e garantir localStorage
function setupLocalStorage() {
  cy.visit(baseUrl);
  cy.setLocalStorage();
  cy.reload();
  cy.window().its("localStorage.session").should("exist");
  cy.window().its("localStorage.user").should("exist");
}

// Função para preencher e enviar um formulário de mensagem
function enviarMensagem(tipoMensagem) {
  let textocurto = `Automação - ${faker.lorem.words(2)}`;
  let textolongo = faker.lorem.paragraphs(1);

  cy.get(".header-menu > .br-button > .fas").should("be.visible").click();
  cy.get(":nth-child(6) > #\\35 0").should("be.visible").click();
  cy.get('[href="/conexao/mensagens/enviar"]:nth-child(1)').should("be.visible").click();

  cy.get('#input_messages-type').should("be.visible").click();
  cy.get(`:nth-child(${tipoMensagem}) > .br-radio > label`).should("be.visible").click();

  cy.get('#subject-id1').type(textocurto).should("be.visible");
  cy.get('.se-wrapper-inner > p').should("be.visible").click().type(textolongo);

  // Upload de Arquivo
  cy.get('input[type="file"]').attachFile(Foto_teste);
  cy.contains(Foto_teste).should("be.visible");

  // Simulação de um clique duplo onde necessário
  cy.get('.mt-0').should('be.visible').click().wait(500).click();

  // Enviar mensagem
  cy.get(':nth-child(2) > button > .name > .row').should("be.visible").click();

  // Verificar se a mensagem foi enviada corretamente
  cy.contains(textocurto).should("be.visible").click();
  cy.contains(textocurto).should("be.visible");
  cy.contains(textolongo).should("be.visible");
  cy.contains(Foto_teste).should("be.visible");
}

describe("Mensagens", () => {
  beforeEach(setupLocalStorage);

  it("Envio Suporte Técnico", () => enviarMensagem(1));
  it("Envio Suporte Pedagógico", () => enviarMensagem(2));
  it("Envio Sugestão", () => enviarMensagem(3));
  it("Envio Reclamação", () => enviarMensagem(5));
  it("Envio de Elogio", () => enviarMensagem(6));

  it.only('Envio de Comunicação Interna', () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);
    cy.get(".header-menu > .br-button > .fas").should('be.visible').click();
    cy.wait(500);
    cy.get(":nth-child(6) > #\\35 0").should('be.visible').click();
    cy.get('[href="/conexao/mensagens/enviar"]:nth-child(1)').should("be.visible").click();
    cy.get('#input_messages-type').should("be.visible").click();
    
    cy.get(':nth-child(4) > .br-radio > label').should("be.visible").click();
    cy.get('#state > .br-input > .br-button').should("be.visible").click();
    cy.get('#state > .br-list > .w-100 > .br-checkbox > label').should("be.visible").click();
    cy.get('#__next').click();
    cy.wait(1000);
    cy.get('#cities > .br-input > .br-button > .fas').should("be.visible").click();
    cy.wait(1000);
    cy.get('#cities > .br-list > .w-100 > .br-checkbox > label').should("be.visible").click();
    cy.get('#__next').click();
    cy.wait(2000);
    cy.get('#input_institution').should("be.visible").click();
    cy.wait(1000);
    cy.get('#institution > .br-list > .w-100 > .br-checkbox > label').should("be.visible").click();
    cy.get('#__next').click();
    cy.wait(2000);
    cy.get('#input_categories').should("be.visible").click();
    cy.wait(1000);
    cy.get('#categories > .br-list > .highlighted > .br-checkbox > label').should("be.visible").click();
    cy.get('#categories > .br-input > .br-button > .fas').should("be.visible").click();
    cy.get('.row > .br-button').should("be.visible").click();
    cy.wait(1000);
    cy.get('#recipients > .br-input > .br-button').click();
    cy.wait(1000);
    cy.get('#recipients > .br-list > .w-100 > .br-checkbox > label').should("be.visible").click();
    cy.wait(1000);
    cy.get('.fa-angle-up:nth-child(2)').click();
    cy.get('#subject-id1').type(textocurto).should("be.visible");
    cy.get('.se-wrapper-inner > p').click();
    cy.get('.se-wrapper-inner > p').type(textolongo);


    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg").should("be.visible");
    //apenas um click não está funcionando

    cy.get('.false > .primary').contains('Enviar').click();;
    cy.wait(1000);
    cy.get('.false > .primary').contains('Enviar').click();;
    cy.get(':nth-child(2) > button > .name > .row').click();
        cy.contains(textocurto).should("be.visible");

    cy.contains(textocurto).click();
        cy.contains(textocurto).should("be.visible");

    cy.contains(textolongo).should("be.visible");
    cy.contains(textolongo).should("be.visible");
    cy.contains("Foto_teste.jpg").should("be.visible");
  });
});
