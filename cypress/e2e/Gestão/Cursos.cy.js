describe("Paginas iniciais", () => {
  beforeEach(() => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/"); // Acesse a página antes de setar o localStorage 
    cy.setLocalStorage();
    // Recarrega a página para aplicar os valores do localStorage
    cy.reload();

    // Valida se os dados foram inseridos corretamente
    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
  });
  it("Sobre o Conexão", () => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
    cy.get('i.fa-bars').click();
  }); 
 });
 