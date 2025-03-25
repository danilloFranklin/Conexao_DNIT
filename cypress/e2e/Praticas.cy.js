import { pt_BR, faker } from "@faker-js/faker";

export const Foto_teste = "Foto_teste.jpg";
export const textocurto = "Automação - " + faker.lorem.words(2);
export const textolongo = faker.lorem.paragraphs(1);
export const yearRandom = Math.floor(Math.random() * 12) + 1;
export const curricularComponentrandom = Math.floor(Math.random() * 8) + 1;
export const studentsRandom = Math.floor(Math.random() * 120) + 1;
export const randomDay = Math.floor(Math.random() * 31) + 1;
export const dataSelector = `[aria-label="Mar\\E7o ${randomDay}, 2025"]`;

describe("Praticas", () => {
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
  it("Cadastrar pratica", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get('.align-items-center > [href="/conexao/praticas"]').click();
    cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!").should("be.visible");
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').click();
    cy.scrollTo(0, 1275);
    cy.get(".br-checkbox > label").click();
    cy.get(":nth-child(2) > .medium > #year > .br-input > .br-button > .fas").click();
    cy.get(`#year > .br-list > :nth-child(${yearRandom}) > .br-radio > label`).click();
    cy.get("#curricularComponent > .br-input > .br-button > .fas").click();
    cy.get(`#curricularComponent > .br-list > :nth-child(${curricularComponentrandom}) > .br-radio > label`).click();
    cy.get(".p-0:nth-child(4) .fas").click();
    cy.get(":nth-child(4) > .medium > #year > .br-list > :nth-child(1) > .br-radio > label").click();
    cy.get("#curriculumContent").type(textocurto);
    cy.get("#dateOfCompletion").click();
    cy.get(dataSelector).click();
    cy.get("#studentsNumber").type(studentsRandom);
    cy.get("#reportYourPractice").type(textolongo);

    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg").should("be.visible");

    cy.get(".row > :nth-child(2) > .br-button").click();
    cy.get(".br-scrim:nth-child(7) .container-fluid").should("not.be.visible")
      .then(($modal) => {
        if ($modal.length) {
          // não parecer, segue"
          cy.log("Modal não encontrado, continuando com o teste.");
        }
           else {
          cy.get('[style="display: flex; justify-content: center;"] > .secondary').click();
          cy.log("Modal encontrado e botão clicado.");
    
      }
    });
  });
  it("pratica repetida", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get('.align-items-center > [href="/conexao/praticas"]').click();
    cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!").should("be.visible");
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').click();
    cy.scrollTo(0, 1275);
    cy.get(".br-checkbox > label").click();
    cy.get(":nth-child(2) > .medium > #year > .br-input > .br-button > .fas").click();
    cy.get(`#year > .br-list > :nth-child(1) > .br-radio > label`).click();
    cy.get("#curricularComponent > .br-input > .br-button > .fas").click();
    cy.get(`#curricularComponent > .br-list > :nth-child(1) > .br-radio > label`).click();
    cy.get(".p-0:nth-child(4) .fas").click();
    cy.get(":nth-child(4) > .medium > #year > .br-list > :nth-child(1) > .br-radio > label").click();
    cy.get("#curriculumContent").type(textocurto);
    cy.get("#dateOfCompletion").click();
    cy.get(".today").click();
    cy.get("#studentsNumber").type(studentsRandom);
    cy.get("#reportYourPractice").type(textolongo);

    // Upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg").should("be.visible");

    cy.get(".row > :nth-child(2) > .br-button").click();
    // Verifica se o modal aparece
    cy.get(".br-scrim:nth-child(7) .container-fluid").should("be.visible").then(($modal) => {
        if ($modal.length) {
          // Se o modal aparecer, clique no botão "Sim"

          cy.get('[style="display: flex; justify-content: center;"] > .secondary').click();
          cy.log("Modal encontrado e botão clicado.");
        } else {
          // Se o modal não aparecer, continua o fluxo normalmente
          cy.log("Modal não encontrado, continuando com o teste.");
        }
      });
  });
});
