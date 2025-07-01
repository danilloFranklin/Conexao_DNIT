import { pt_BR, faker } from "@faker-js/faker";

// Configurações iniciais
const timeoutValue = Cypress.config('defaultCommandTimeout');
const today = new Date();
const textocurto = "Automação - " + faker.lorem.words(2);

// Nomes dos meses
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
const randomDay = Math.floor(Math.random() * (30 - today.getDate() + 1)) + today.getDate();

// Função para formatar para [aria-label="Mês Dia, Ano"]
const formatDateSelector = (date) => {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `[aria-label="${month} ${day}, ${year}"]`;
};

// Função para formatar para "ddmmyyyy"
const formatDateDigits = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
};

// Gerando seletores de data
export const dataSelectorCurrentMonth = `[aria-label="${currentMonth} ${randomDay}, ${currentYear}"]`;
export const dataSelectorFutureMonth = `[aria-label="${futureMonth} ${randomDay}, ${futureYear}"]`;

// Gerando datas aleatórias entre dois meses
const startDate = new Date(currentYear, currentMonthIndex, 1);
const endDate = new Date(futureYear, futureMonthIndex + 1, 0);

const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
const randomDate = new Date(randomTimestamp);

// Exports em [aria-label] e em números (ddmmyyyy)
export const dataSelectorRandomBetween = formatDateSelector(randomDate);
export const digitsDateCurrentMonth = formatDateDigits(new Date(currentYear, currentMonthIndex, randomDay));
export const digitsDateFutureMonth = formatDateDigits(new Date(futureYear, futureMonthIndex, randomDay));
export const digitsDateRandomBetween = formatDateDigits(randomDate);



// ================== TESTES ==================

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

  it("Cadastrar planejamento", () => {
    cy.get('.align-items-center > [href="/conexao/planejamento-pedagogico"]').should("be.visible").click();
    cy.get('.table-title').contains("Meus planejamentos pedagógicos de atividades de educação para o trânsito");
    cy.get('[href="/conexao/planejamento-pedagogico/novo"]:nth-child(1)').should("be.visible").click();
    cy.scrollTo(0, 990);
    cy.get('.col-12:nth-child(1) label').should("be.visible").click();
    cy.get('.col-12:nth-child(2) label').should("be.visible").click();
    cy.get('.col-auto > .br-button').should("be.visible").click();

    cy.get('#planningTitle').type(textocurto);

    cy.scrollTo(0, 247);
    cy.get('input#From').first().click();
    cy.wait(1000)
    cy.get(dataSelectorCurrentMonth).eq(0).click(); // Data de início
    cy.get('input[name="dateEnd"]').should("be.visible").click();
    cy.wait(1000)
    cy.get('.open .flatpickr-next-month .fas').click(); // Vai para o próximo mês
    cy.wait(1000)
    cy.get('.open .flatpickr-next-month .fas').click(); // Vai para o segundo próximo mês
    cy.get(dataSelectorFutureMonth).eq(0).click(); // Data de fim
    cy.wait(1000)

    // 👉 Digitando data aleatória entre início e fim
    cy.log("Data aleatória: " + digitsDateRandomBetween);
    cy.scrollTo(0, 444);
    cy.wait(1000)
    cy.get('#scheduledDate-5').should("exist").type(digitsDateRandomBetween);
    cy.get('div#__next').click();
    cy.wait(1000)
    cy.get('#scheduledDate-6').should("exist").click().type(digitsDateRandomBetween);
    cy.get('div#__next').click();
    cy.wait(1000)
    cy.get('.col-auto > .primary').should("be.visible").click();
    
  });
});
