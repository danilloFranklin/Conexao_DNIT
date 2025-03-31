import { pt_BR, faker } from "@faker-js/faker";
const timeoutValue = Cypress.config('defaultCommandTimeout');

export const Foto_teste = "Foto_teste.jpg";
export const yearRandom = Math.floor(Math.random() * 12) + 1;
export const curricularComponentrandom = Math.floor(Math.random() * 8) + 1;
export const studentsRandom = Math.floor(Math.random() * 120) + 1;
export const today = new Date();
export const day = today.getDate();
export const randomDay = Math.floor(Math.random() * day) + 1;
export const dataSelector = `[aria-label="Mar\\E7o ${randomDay}, 2025"]`;


describe("Praticas", () => {
  beforeEach(() => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao"); // Acesse a página antes de setar o localStorage

    cy.setLocalStorage();
    // Recarrega a página para aplicar os valores do localStorage
    cy.reload();

    // Valida se os dados foram inseridos corretamente
    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
    cy.wait(1000);
  });
  const acessarMenuCursos = () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click();
    cy.wait(1000);
    cy.get(':nth-child(7) > #\\35 7').should("be.visible").click();
    cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!").should("be.visible");
  };
  it("Nova pratica", () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click();
    cy.wait(1000);
    cy.get(':nth-child(7) > #\\35 7').should("be.visible").click();
    cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!").should("be.visible");
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').should("be.visible").click();
    cy.get(".br-checkbox > label").click();
    cy.get(":nth-child(2) > .medium > #year > .br-input > .br-button > .fas").should("be.visible").click();
    cy.get(`#year > .br-list > :nth-child(${yearRandom}) > .br-radio > label`).should("exist").click();
    cy.get("#curricularComponent > .br-input > .br-button > .fas").should("be.visible").click();
    cy.get(`#curricularComponent > .br-list > :nth-child(${curricularComponentrandom}) > .br-radio > label`).should("exist").click();
    cy.wait(2000); // BO ta aqui nessa desgraça! 

    cy.get(':nth-child(4) > .medium > #year > .br-input > .br-button > .fas').should("be.visible").click();
    cy.get(':nth-child(4) > .medium > #year > .br-list > :nth-child(1) > .br-radio > label').should("be.visible").click()
    cy.get("#curriculumContent").should("be.visible").type(textocurto);
    cy.get("#dateOfCompletion").should("be.visible").click();
    cy.get(dataSelector).click();
    cy.get("#studentsNumber").should("be.visible").type(studentsRandom);
    cy.get("#reportYourPractice").should("be.visible").type(textolongo);

    //upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg").should("be.visible");
    cy.wait(1000);
    cy.get('.mt-0').should("be.visible").click();
    cy.get('body').then($body => {
      if ($body.find('.active > .container-lg > .mx-auto > .br-modal > .container-fluid').length > 0) {
        cy.get('.active > .container-lg > .mx-auto > .br-modal > .container-fluid').should('be.visible');
        cy.get('#closeModalAccepted').click();
      } else {
        cy.log("Modal não apareceu, seguindo o teste...");
      }
    });
  });


 
    it("Editar Pratica", () => {
      let textocurto = "Automação - " + faker.lorem.words(2);
      let textolongo = faker.lorem.paragraphs(1);
      
        cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); // menu amburguer
        cy.get(':nth-child(7) > #\\35 7').should("exist").click(); //botão para acessar pagina de praticas
        cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!").should("be.visible");
  
        cy.get(':nth-child(1) > :nth-child(6) > .tooltip-container > .br-button').should("exist").click();
  
        cy.get("#curriculumContent").should("be.visible").clear();
  
        cy.get("#curriculumContent").should("be.visible").type("Edição -" + textocurto);
  

        
        // Upload de Arquivo
        cy.get('input[type="file"]').attachFile(Foto_teste);
  
        cy.contains("Foto_teste.jpg").should("be.visible");
    
        cy.get(".row > :nth-child(2) > .br-button").should("be.visible").click();
        // Verifica se o modal aparece
        cy.get(".br-scrim:nth-child(7) .container-fluid").should("be.visible").then(($modal) => {
            if ($modal.length) {
              // Se o modal aparecer, clique no botão "Sim"
    
              cy.get('[style="display: flex; justify-content: center;"] > .secondary').should("be.visible").click();
        
              cy.log("Modal encontrado e botão clicado.");
            } else {
              // Se o modal não aparecer, continua o fluxo normalmente
              cy.log("Modal não encontrado, continuando com o teste.");
            }
          });
        });
  it("pratica repetida", () => {
        let textocurto = "Automação - " + faker.lorem.words(2);
        let textolongo = faker.lorem.paragraphs(1);
        cy.get(".header-menu > .br-button > .fas").click();
        cy.wait(1000);
        cy.get(':nth-child(7) > #\\35 7').should("be.visible").click();
        cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!").should("be.visible");
        cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').should("exist").click();
        cy.get(".br-checkbox > label").should("be.visible").click();
        cy.get(":nth-child(2) > .medium > #year > .br-input > .br-button > .fas").should("be.visible").click();
        cy.get("#year > .br-list > :nth-child(1) > .br-radio > label").should("exist").click();
        cy.get("#curricularComponent > .br-input > .br-button > .fas").should("be.visible").click();
        cy.get("#curricularComponent > .br-list > :nth-child(1) > .br-radio > label").should("be.visible").click();
        cy.wait(1000);
        cy.get(':nth-child(4) > .medium > #year > .br-input > .br-button > .fas').should("be.visible").click();
        cy.get(':nth-child(4) > .medium > #year > .br-list > :nth-child(1) > .br-radio > label').should("be.visible").click()
        cy.get("#curriculumContent").type(textocurto);
        cy.get("#dateOfCompletion").should("be.visible").click();
        cy.get(dataSelector).should("be.visible").click();
        cy.get("#studentsNumber").type(studentsRandom);
        cy.get("#reportYourPractice").type(textolongo);

        // Upload de Arquivo
        cy.get('input[type="file"]').attachFile(Foto_teste);
  
        cy.contains("Foto_teste.jpg").should("be.visible");
    
        cy.get(".row > :nth-child(2) > .br-button").should("be.visible").click();
        // Verifica se o modal aparece
        cy.get(".br-scrim:nth-child(7) .container-fluid").should("be.visible").then(($modal) => {
            if ($modal.length) {
              // Se o modal aparecer, clique no botão "Sim"
    
              cy.get('[style="display: flex; justify-content: center;"] > .secondary').should("be.visible").click();
        
              cy.log("Modal encontrado e botão clicado.");
            } else {
              // Se o modal não aparecer, continua o fluxo normalmente
              cy.log("Modal não encontrado, continuando com o teste.");
            }
          });
    });
  });
  