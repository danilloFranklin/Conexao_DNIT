import { pt_BR, faker } from "@faker-js/faker";
const timeoutValue = Cypress.config('defaultCommandTimeout');
const today = new Date();
const textocurto = "Automação - " + faker.lorem.words(2);

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Mês atual
const currentMonthIndex = today.getMonth();
const currentMonth = monthNames[currentMonthIndex];
const currentYear = today.getFullYear();

// Mês dois meses depois
let futureMonthIndex = currentMonthIndex + 2;
let futureYear = currentYear;

if (futureMonthIndex > 11) {
  futureMonthIndex -= 12;
  futureYear += 1;
}

const futureMonth = monthNames[futureMonthIndex];

// Gerando dia aleatório do mês atual
const randomDay = Math.floor(Math.random() * (31 - today.getDate() + 1)) + today.getDate();

// Gerando seletores de data de início e fim
export const dataSelectorCurrentMonth = `[aria-label="${currentMonth} ${randomDay}, ${currentYear}"]`;
export const dataSelectorFutureMonth = `[aria-label="${futureMonth} ${randomDay}, ${futureYear}"]`;

// ===== NOVO BLOCO: Data aleatória entre os dois meses =====

// 1º dia do mês atual
const startDate = new Date(currentYear, currentMonthIndex, 1);
// Último dia do mês dois meses depois
const endDate = new Date(futureYear, futureMonthIndex + 1, 0); 

// Gerando uma data aleatória entre startDate e endDate
const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
const randomDate = new Date(randomTimestamp);

// Formata para [aria-label="Mês Dia, Ano"]
const formatDateSelector = (date) => {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `[aria-label="${month} ${day}, ${year}"]`;
};

export const dataSelectorRandomBetween = formatDateSelector(randomDate);
// ==========================================================

describe("Atividades", () => {
  const fileName = "home.pdf";
  const filePath = `cypress/downloads/${fileName}`;
  const textoAleatorio = faker.lorem.sentence();

  beforeEach(() => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao");
    cy.setLocalStorage();
    cy.reload();

    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
  });

  it("Acessar lista", () => {
    cy.get('.align-items-center > [href="/conexao/planejamento-pedagogico"]').should("be.visible").click();
    cy.get('.table-title').contains("Meus planejamentos pedagógicos de atividades de educação para o trânsito");
    cy.get('[href="/conexao/planejamento-pedagogico/novo"]:nth-child(1)').should("be.visible").click();
  });

  it.only("cadastrar planejamento", () => {
    cy.get('.align-items-center > [href="/conexao/planejamento-pedagogico"]').should("be.visible").click();
    cy.get('.table-title').contains("Meus planejamentos pedagógicos de atividades de educação para o trânsito");
    cy.get('[href="/conexao/planejamento-pedagogico/novo"]:nth-child(1)').should("be.visible").click();
    cy.scrollTo(0, 990);
    cy.get('.col-12:nth-child(1) label').should("be.visible").click();
    cy.get('.col-12:nth-child(2) label').should("be.visible").click();
    cy.get('.col-auto > .br-button').should("be.visible").click();

    cy.get('#planningTitle').type(textocurto);
    cy.log("Dia de hoje é: ", randomDay);

    cy.scrollTo(0, 247);
    cy.get('.br-input > #From').first().click();
    cy.get(dataSelectorCurrentMonth).eq(0).click(); // Data de início

    cy.get('.br-input > #To').should("be.visible").click();
    cy.get('.open .flatpickr-next-month .fas').click(); // Vai pro mês seguinte
    cy.get('.open .flatpickr-next-month .fas').click(); // Vai pro segundo mês seguinte
    cy.get(dataSelectorFutureMonth).eq(0).click(); // Data de fim

    // 👉 Clicando na data aleatória entre início e fim
    cy.scrollTo(0, 444);
    cy.get('#scheduledDate-6').click(); // ou qualquer outro campo necessário
    cy.get('#scheduledDate-6').should("be.visible").click().type(dataSelectorRandomBetween);

    // cy.get('.col-auto > .primary').should("be.visible").click();
    // cy.scrollTo(0, 555);
  });
});
