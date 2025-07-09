import { faker } from "@faker-js/faker";
describe("Instituições de Ensino", () => {
  {
    const fileName = "lista_instituicoes.csv"; // Nome do arquivo esperado
    const filePath = `cypress/downloads/${fileName}`;
    const textocurto = `Automação - ${faker.lorem.words(2)}`;
    const telefoneValido = faker.phone.number("(##) #########");
    const emailValido = faker.internet.email();
    const numeroAleatorio = Math.floor(10000000 + Math.random() * 90000000);

    beforeEach(() => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/"); // Acesse a página antes de setar o localStorage
      cy.setLocalStorage();
      // Recarrega a página para aplicar os valores do localStorage
      cy.reload();

      // Valida se os dados foram inseridos corretamente
      cy.window().its("localStorage.session").should("exist");
      cy.window().its("localStorage.user").should("exist");
    });
it("acessar lista", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/entidades"] span').click();
      cy.contains('td', 'DETRAN ALAGOAS').should("be.visible");
    });
    
    it("Filtrar e limpar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/entidades"] span').click();
      cy.contains('td', 'DETRAN ALAGOAS').should("be.visible");
      cy.get('input#input_state').should("be.visible").click().type("MG");
      cy.contains('label', 'MG').should('be.visible').click();
      cy.wait(600);
      cy.get('input#input_city').should("be.visible").type("bocaiuva")
      cy.wait(600);
      cy.contains('label', 'Bocaiúva').click();
      cy.contains('label', 'Com parcerias ativas').click();
      cy.contains('button', 'Buscar').click();
      cy.contains('td', 'Entidade Krycia 25/01').should("be.visible");
      cy.contains('button', 'Limpar').click();
      cy.contains('td', 'DETRAN ALAGOAS').should("be.visible");



    });
}
});
