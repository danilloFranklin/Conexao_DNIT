import { pt_BR, faker } from "@faker-js/faker";
import { it } from "mocha";

export const Foto_teste = "Foto_teste.jpg";
export const yearRandom = Math.floor(Math.random() * 12) + 1;
export const typeMensengerRandom = Math.floor(Math.random() * 6) + 1;
export const curricularComponentrandom = Math.floor(Math.random() * 8) + 1;
export const studentsRandom = Math.floor(Math.random() * 120) + 1;
export const randomDay = Math.floor(Math.random() * 31) + 1;
export const dataSelector = `[aria-label="Mar\\E7o ${randomDay}, 2025"]`;

describe("Mensagens", () => {
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

  it('Envio Suporte tecnico', () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(6) > #\\35 0").click();
    cy.get('[href="/conexao/mensagens/enviar"]:nth-child(1)').click();
    cy.get('#input_messages-type').click();
    cy.get(`:nth-child(1) > .br-radio > label`).click();
    cy.get('#subject-id1').type(textocurto);
    cy.get('.se-wrapper-inner > p').click();
    cy.get('.se-wrapper-inner > p').type(textolongo);


    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
    //apenas um click não está funcionando
    cy.get('.mt-0').click()
    cy.wait(1000)
    cy.get('.mt-0').click()
    
    cy.get(':nth-child(2) > button > .name > .row').click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textocurto).click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textolongo).should("be.visible");
    cy.contains(textolongo).should("be.visible");
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
  });
it('Envio Suporte pedagogico', () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(6) > #\\35 0").click();
    cy.get('[href="/conexao/mensagens/enviar"]:nth-child(1)').click();
    cy.get('#input_messages-type').click();
    cy.get(':nth-child(2) > .br-radio > label').click();
    cy.get('#subject-id1').type(textocurto);
    cy.get('.se-wrapper-inner > p').click();
    cy.get('.se-wrapper-inner > p').type(textolongo);


    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
    //apenas um click não está funcionando
    cy.get('.mt-0').click()
    cy.wait(1000)
    cy.get('.mt-0').click()
    cy.get(':nth-child(2) > button > .name > .row').click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textocurto).click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textolongo).should("be.visible");
    cy.contains(textolongo).should("be.visible");
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
  });
  it('Envio Sugestão', () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(6) > #\\35 0").click();
    cy.get('[href="/conexao/mensagens/enviar"]:nth-child(1)').click();
    cy.get('#input_messages-type').click();
    cy.get(':nth-child(3) > .br-radio > label').click();
    cy.get('#subject-id1').type(textocurto);
    cy.get('.se-wrapper-inner > p').click();
    cy.get('.se-wrapper-inner > p').type(textolongo);


    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
    //apenas um click não está funcionando
    cy.get('.mt-0').click()
    cy.wait(1000)
    cy.get('.mt-0').click()
    cy.get(':nth-child(2) > button > .name > .row').click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textocurto).click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textolongo).should("be.visible");
    cy.contains(textolongo).should("be.visible");
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
  });

  it.only('Envio de Comunicação Interna', () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(6) > #\\35 0").click();
    cy.get('[href="/conexao/mensagens/enviar"]:nth-child(1)').click();
    cy.get('#input_messages-type').click();
    cy.get(':nth-child(4) > .br-radio > label').click();
    cy.get('#state > .br-input > .br-button').click();
    cy.get('#state > .br-list > .w-100 > .br-checkbox > label').click();
    cy.get('#__next').click();
    cy.get('#input_cities').click();
    cy.get('#cities > .br-list > .w-100 > .br-checkbox > label').click();

    // cy.get('#subject-id1').type(textocurto);
    // cy.get('.se-wrapper-inner > p').click();
    // cy.get('.se-wrapper-inner > p').type(textolongo);


    // //upload de Arquivo
    // cy.get('input[type="file"]').attachFile(Foto_teste);
    // cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
    // //apenas um click não está funcionando
    // cy.get('.mt-0').click()
    // cy.wait(1000)
    // cy.get('.mt-0').click()
    // cy.get(':nth-child(2) > button > .name > .row').click();
    // cy.wait(5000)
    //     cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    // cy.contains(textocurto).click();
    //     cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    // cy.contains(textolongo).should("be.visible");
    // cy.contains(textolongo).should("be.visible");
    // cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
  });
  it('Envio Reclamação', () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(6) > #\\35 0").click();
    cy.get('[href="/conexao/mensagens/enviar"]:nth-child(1)').click();
    cy.get('#input_messages-type').click();
    cy.get(':nth-child(5) > .br-radio > label').click();
    cy.get('#subject-id1').type(textocurto);
    cy.get('.se-wrapper-inner > p').click();
    cy.get('.se-wrapper-inner > p').type(textolongo);


    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
    //apenas um click não está funcionando
    cy.get('.mt-0').click()
    cy.wait(1000)
    cy.get('.mt-0').click()
    cy.get(':nth-child(2) > button > .name > .row').click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textocurto).click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textolongo).should("be.visible");
    cy.contains(textolongo).should("be.visible");
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
  });
  it('Envio de Elogio', () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(6) > #\\35 0").click();
    cy.get('[href="/conexao/mensagens/enviar"]:nth-child(1)').click();
    cy.get('#input_messages-type').click();
    cy.get(':nth-child(6) > .br-radio > label').click();
    cy.get('#subject-id1').type(textocurto);
    cy.get('.se-wrapper-inner > p').click();
    cy.get('.se-wrapper-inner > p').type(textolongo);


    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");

    //apenas um click não está funcionando
    cy.get('.mt-0').click()
    cy.wait(1000)
    cy.get('.mt-0').click()
    cy.get(':nth-child(2) > button > .name > .row').click();
    cy.contains(textocurto, { timeout: 15000 }).should("be.visible");
    cy.contains(textocurto).click();
        cy.contains(textocurto, { timeout: 15000 }).should("be.visible");

    cy.contains(textolongo).should("be.visible");
    cy.contains(textolongo).should("be.visible");
    cy.contains("Foto_teste.jpg", { timeout: 15000 }).should("be.visible");
  });
});