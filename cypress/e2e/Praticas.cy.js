import { pt_BR, faker } from "@faker-js/faker";
const timeoutValue = Cypress.config('defaultCommandTimeout');

export const Foto_teste = "Foto_teste.jpg";
export const yearRandom = Math.floor(Math.random() * 12) + 1;
export const curricularComponentRandom = Math.floor(Math.random() * 8) + 1;
export const studentsRandom = Math.floor(Math.random() * 120) + 1;
export const today = new Date();
export const day = today.getDate();
export const randomDay = Math.floor(Math.random() * day) + 1;

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
const currentMonth = monthNames[today.getMonth()];
const currentYear = today.getFullYear();

export const dataSelector = `[aria-label="${currentMonth} ${randomDay}, ${currentYear}"]`;

describe("Práticas", () => {
  beforeEach(() => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao");
    cy.setLocalStorage();
    cy.reload();
    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
  });

  // 🔹 Função para acessar a página de práticas
  const acessarMenuPraticas = () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(':nth-child(7) > #\\35 7').should("be.visible").click();
    cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito").should("be.visible");
  };

  // 🔹 Função para preencher formulário de práticas
  const preencherFormularioPratica = (textocurto, textolongo) => {
    cy.get(".br-checkbox > label").click();
    cy.get(":nth-child(2) > .medium > #year > .br-input > .br-button").click();
    cy.get(`#year > .br-list > :nth-child(${yearRandom}) > .br-radio > label`).click();
    cy.get("#curricularComponent > .br-input > .br-button").click();
    cy.get(`#curricularComponent > .br-list > :nth-child(${curricularComponentRandom}) > .br-radio > label`).click();

    cy.get(':nth-child(4) > .medium > #year > .br-input > .br-button').click();
    cy.get(':nth-child(4) > .medium > #year > .br-list > :nth-child(1) > .br-radio > label').click();

    cy.get("#curriculumContent").type(textocurto);
    cy.get("#dateOfCompletion").click();
    cy.get(dataSelector).click();
    cy.get("#studentsNumber").type(studentsRandom);
    cy.get("#reportYourPractice").type(textolongo);

    // Upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains(Foto_teste).should("be.visible");
  };

  it("Nova prática", () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);

    acessarMenuPraticas();
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').click();
    preencherFormularioPratica(textocurto, textolongo);

    // Submissão e verificação do modal
    cy.get(".mt-0").click();
    cy.get('body').then($body => {
      if ($body.find('.br-modal').length > 0) {
        cy.get('#closeModalAccepted').click();
      } else {
        cy.log("Modal não apareceu, seguindo o teste...");
      }
    });
  });

  it("Editar prática", () => {
    let textocurto = "Automação - " + faker.lorem.words(2);

    acessarMenuPraticas();
    cy.get(':nth-child(1) > :nth-child(6) > .tooltip-container > .br-button').click();
    cy.get("#curriculumContent").clear().type("Edição - " + textocurto);
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains(Foto_teste).should("be.visible");

    cy.get(".row > :nth-child(2) > .br-button").click();
    cy.get(".br-scrim:nth-child(7) .container-fluid").should("be.visible").then(($modal) => {
      if ($modal.length) {
        cy.get('[style="display: flex; justify-content: center;"] > .secondary').click();
        cy.log("Modal encontrado e botão clicado.");
      } else {
        cy.log("Modal não encontrado, continuando com o teste.");
      }
    });
  });

  it("Prática repetida", () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);

    acessarMenuPraticas();
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').click();
    preencherFormularioPratica(textocurto, textolongo);

    // Submissão e verificação do modal
    cy.get(".row > :nth-child(2) > .br-button").click();
    cy.get(".br-scrim:nth-child(7) .container-fluid").should("be.visible").then(($modal) => {
      if ($modal.length) {
        cy.get('[style="display: flex; justify-content: center;"] > .secondary').click();
        cy.log("Modal encontrado e botão clicado.");
      } else {
        cy.log("Modal não encontrado, continuando com o teste.");
      }
    });
  });
});
