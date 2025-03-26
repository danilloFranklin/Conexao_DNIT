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
    cy.viewport(1920, 1080);
    cy.setLocalStorage();
    // Recarrega a página para aplicar os valores do localStorage
    cy.reload();

    // Valida se os dados foram inseridos corretamente
    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
    cy.wait(1000);
  });
  it("Nova pratica", () => {
    let textocurto = "Automação - " + faker.lorem.words(2);
    let textolongo = faker.lorem.paragraphs(1);
    cy.get(".header-menu > .br-button > .fas", { timeout: 30000 }).click();
    cy.get('.align-items-center > [href="/conexao/praticas"]', { timeout: 30000 }).click();
    cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!").should("be.visible");
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)', { timeout: 30000 }).click();
    cy.get(".br-checkbox > label").click();
    cy.get(":nth-child(2) > .medium > #year > .br-input > .br-button > .fas", { timeout: 30000 }).click();
    cy.get(`#year > .br-list > :nth-child(${yearRandom}) > .br-radio > label`, { timeout: 30000 }).click();
    cy.get("#curricularComponent > .br-input > .br-button > .fas", { timeout: 30000 }).click();
    cy.get(`#curricularComponent > .br-list > :nth-child(${curricularComponentrandom}) > .br-radio > label`, { timeout: 30000 }).click();
    cy.wait(2000); // BO ta aqui nessa desgraça! 

    cy.get(':nth-child(4) > .medium > #year > .br-input > .br-button > .fas', { timeout: 30000 }).click();
    cy.get(':nth-child(4) > .medium > #year > .br-list > :nth-child(1) > .br-radio > label', { timeout: 30000 }).click()
    cy.get("#curriculumContent", { timeout: 30000 }).type(textocurto);
    cy.get("#dateOfCompletion", { timeout: 30000 }).click();
    cy.get(dataSelector).click();
    cy.get("#studentsNumber", { timeout: 30000 }).type(studentsRandom);
    cy.get("#reportYourPractice", { timeout: 30000 }).type(textolongo);

    //upload de Arquivo
    cy.get('input[type="file"]', { timeout: 30000 }).attachFile(Foto_teste);
    cy.contains("Foto_teste.jpg", { timeout: 30000 }).should("be.visible");
    cy.wait(1000);
    cy.get('.mt-0', { timeout: 30000 }).click();
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
      
        cy.get(".header-menu > .br-button > .fas").click(); // menu amburguer
        cy.get('.align-items-center > [href="/conexao/praticas"]').click(); //botão para acessar pagina de praticas
        cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!", { timeout: 30000 }).should("be.visible");
  
        cy.get(':nth-child(1) > :nth-child(6) > .tooltip-container > .br-button', { timeout: 30000 }).click();
  
        cy.get("#curriculumContent", { timeout: 30000 }).clear();
  
        cy.get("#curriculumContent", { timeout: 30000 }).type("Edição -" + textocurto);
  

        
        // Upload de Arquivo
        cy.get('input[type="file"]').attachFile(Foto_teste);
  
        cy.contains("Foto_teste.jpg").should("be.visible");
    
        cy.get(".row > :nth-child(2) > .br-button", { timeout: 30000 }).click();
        // Verifica se o modal aparece
        cy.get(".br-scrim:nth-child(7) .container-fluid", { timeout: 30000 }).should("be.visible").then(($modal) => {
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
  it("pratica repetida", () => {
        let textocurto = "Automação - " + faker.lorem.words(2);
        let textolongo = faker.lorem.paragraphs(1);
        cy.get(".header-menu > .br-button > .fas", { timeout: 30000 }).click();
        cy.get('.align-items-center > [href="/conexao/praticas"]', { timeout: 30000 }).click();
  
        cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito integrada aos saberes escolares, do Programa Conexão DNIT. Compartilhe suas experiências para motivar e conectar mais colegas nessa rede de educação para a vida!").should("be.visible");
        cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)', { timeout: 30000 }).click();
  
        cy.get(".br-checkbox > label").click();
  
        cy.get(":nth-child(2) > .medium > #year > .br-input > .br-button > .fas", { timeout: 30000 }).click();
  
        cy.get(`#year > .br-list > :nth-child(1) > .br-radio > label`, { timeout: 30000 }).click();
  
        cy.get("#curricularComponent > .br-input > .br-button > .fas", { timeout: 30000 }).click();
  
        cy.get(`#curricularComponent > .br-list > :nth-child(1) > .br-radio > label`, { timeout: 30000 }).click();
        cy.wait(1000);
        cy.get(':nth-child(4) > .medium > #year > .br-input > .br-button > .fas', { timeout: 30000 }).click();
  
        cy.get(':nth-child(4) > .medium > #year > .br-list > :nth-child(1) > .br-radio > label', { timeout: 30000 }).click()
  
        cy.get("#curriculumContent", { timeout: 30000 }).type(textocurto);
  
        cy.get("#dateOfCompletion", { timeout: 30000 }).click();
  
        cy.get(dataSelector).click();
  
        cy.get("#studentsNumber", { timeout: 30000 }).type(studentsRandom);
  
        cy.get("#reportYourPractice", { timeout: 30000 }).type(textolongo);
  

        //upload de Arquivo
        cy.get('input[type="file"]', { timeout: 30000 }).attachFile(Foto_teste);
  
        cy.contains("Foto_teste.jpg", { timeout: 30000 }).should("be.visible");
        cy.wait(1000);
        cy.get('.mt-0', { timeout: 30000 }).click();
  
        cy.get('.active > .container-lg > .mx-auto > .br-modal > .container-fluid').then($modal => {
           if ($modal.is(':visible')) { 
            // Se o modal aparecer, clica no botão "Sim"
              cy.get('#closeModalAccepted').click();
            };
      }); 
    });
  });
  