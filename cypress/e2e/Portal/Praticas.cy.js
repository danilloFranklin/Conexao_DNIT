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
    cy.get('button[data-target="#navigation"] i').click();
    cy.contains('a', 'Minhas Práticas').should("be.visible").click();
    cy.contains("Conte como foi realizar a atividade de Educação para o Trânsito").should("be.visible");
  };

  // 🔹 Função para preencher formulário de práticas
  const preencherFormularioPratica = (textocurto, textolongo) => {
    cy.get(".br-checkbox > label").click();
    cy.wait(1000);
    cy.get('input[placeholder="Selecione o ano/série da prática."]').click();
    cy.wait(1000);
    cy.get(`#year > .br-list > :nth-child(${yearRandom}) > .br-radio > label`).click();
    cy.wait(1000);
    cy.get('input#input_curricularComponent').click();
    cy.wait(1000);
    cy.get(`#curricularComponent > .br-list > :nth-child(${curricularComponentRandom}) > .br-radio > label`).click();
    cy.wait(1000);

    cy.get('input[placeholder="Selecione a atividade utilizada na prática."]').click();
    cy.wait(1000);
    cy.get('label[for*="activities_selector"]').eq(0).click();
    cy.wait(1000);

    cy.get("#curriculumContent").type(textocurto);
    cy.wait(1000);
    cy.get("#dateOfCompletion").click();
    cy.wait(1000);
    cy.get(dataSelector).click();
    cy.wait(1000);
    cy.get('input#numberOfStudents').type(studentsRandom);
    cy.wait(1000);
    cy.get("#reportYourPractice").type(textolongo);

    // Upload de Arquivo
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains(Foto_teste).should("be.visible");
  };

  const validaObrigatoriedade = (textocurto, textolongo) => {
    cy.get(".br-checkbox > label").click();
    cy.wait(1000);
    cy.get('input[placeholder="Selecione o ano/série da prática."]').click();
    cy.wait(1000);
    cy.get(`#year > .br-list > :nth-child(${yearRandom}) > .br-radio > label`).click();
    cy.wait(1000);
    cy.get('input#input_curricularComponent').click();
    cy.wait(1000);
    cy.get(`#curricularComponent > .br-list > :nth-child(${curricularComponentRandom}) > .br-radio > label`).click();
    cy.wait(1000);

    cy.get('input[placeholder="Selecione a atividade utilizada na prática."]').click();
    cy.wait(1000);
    cy.get('label[for*="activities_selector"]').eq(0).click();
    cy.wait(1000);

    cy.get("#curriculumContent").type(textocurto);
    cy.wait(1000);
    cy.get("#dateOfCompletion").click();
    cy.wait(1000);
    cy.get(dataSelector).click();
    cy.wait(1000);
    cy.get('input#numberOfStudents').type(studentsRandom);
    cy.wait(1000);
    cy.get("#reportYourPractice").type(textolongo);
  };

  // 🔹 Função para fechar modal se ele estiver presente
  const fecharModalSeExistir = () => {
    cy.get('body').then(($body) => {
      const botaoFechar = $body.find('[style="display: flex; justify-content: center;"] > .secondary');
      if (botaoFechar.length > 0) {
        cy.wrap(botaoFechar).click({ force: true });
        cy.log("✅ Modal encontrado e botão clicado.");
      } else {
        cy.log("ℹ️ Modal não encontrado, seguindo o teste.");
      }
    });
  };
  it("Nova prática", () => {
    const textocurto = "Automação Pratica- " + faker.lorem.words(2);
    const textolongo = faker.lorem.paragraphs(1);

    acessarMenuPraticas();
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').click();
    preencherFormularioPratica(textocurto, textolongo);

    cy.contains('button', 'Enviar').click();
    fecharModalSeExistir();
  });

  it("Editar prática", () => {
    const textocurto = "Automação Pratica - " + faker.lorem.words(2);

    acessarMenuPraticas();
    cy.get(':nth-child(1) > :nth-child(6) > .tooltip-container > .br-button').click();
    cy.get("#curriculumContent").clear().type("Edição - " + textocurto);
    cy.get('input[type="file"]').attachFile(Foto_teste);
    cy.contains(Foto_teste).should("be.visible");

    cy.get(".row > :nth-child(2) > .br-button").click();
    fecharModalSeExistir();
  });

  it("Prática repetida", () => {
    const textocurto = "Automação Pratica - " + faker.lorem.words(2);
    const textolongo = faker.lorem.paragraphs(1);

    acessarMenuPraticas();
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').click();
    preencherFormularioPratica(textocurto, textolongo);

    cy.get(".row > :nth-child(2) > .br-button").click();
    fecharModalSeExistir();
  });

  it("imagem obrigatoria", () => {
    const textocurto = "Automação Pratica - " + faker.lorem.words(2);
    const textolongo = faker.lorem.paragraphs(1);

    acessarMenuPraticas();
    cy.get('[href="/conexao/praticas/enviar"]:nth-child(1)').click();


    validaObrigatoriedade(textocurto, textolongo);

    
    cy.contains('button', 'Enviar').click();

    cy.wait(1500)

    fecharModalSeExistir();

    cy.contains("Você deve enviar pelo menos uma imagem.").should('exist');    
  });
});
