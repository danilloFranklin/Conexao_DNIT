describe("Paginas iniciais", () => {
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
  it("Sobre o Conexão", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(1) > #\\34 2").click();
    cy.get("#widget2").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Como participar", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(".menu-body > :nth-child(2) > #\\34 3").click();
    cy.get('[style="margin-bottom: 200px;"] > .contrast-ignore-bg').should(
      "be.visible"
    );
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Cursos", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(3) > #\\34 5").click();
    cy.contains(
      "Nesta área, você acessa materiais de formação completos, como capacitações para educadores e cursos livres relacionados ao tema de trânsito."
    ).should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Projetos e Campanhas", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(4) > #\\34 6").click();
    cy.contains("Projetos e Campanhas em Destaque").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Atividades", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(5) > #\\34 8").click();
    cy.contains("Ensino Fundamental").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Mensagens", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(6) > #\\35 0").click();
    cy.get(":nth-child(3) > :nth-child(3) > a > .br-button").should(
      "be.visible"
    );
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Minhas Práticas", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(7) > #\\35 7").click();
    cy.contains("Minhas Práticas Pedagógicas").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Praticas compartilhadas", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(8) > #\\35 8").click();
    cy.contains("Práticas Compartilhadas").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Meus Planejamentos Pedagógicos", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(9) > #\\31 058").click();
    cy.get(".mb-3 > a > .br-button").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Perfil", () => {
    cy.get('[href="/conexao/perfil"]').click();
    cy.contains("Nome: Danillo Franklin Leite Lopes").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });

  it("Iniciativas", () => {
    cy.get("#Iniciativas svg").click();
    cy.get(".table-title").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("be.visible");
  });
});
