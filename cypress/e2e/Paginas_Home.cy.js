describe("Paginas iniciais", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao"); // Acesse a página antes de setar o localStorage 
    cy.setLocalStorage();
    // Recarrega a página para aplicar os valores do localStorage
    cy.reload();

    // Valida se os dados foram inseridos corretamente
    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
  });
  it("Sobre o Conexão", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(":nth-child(1) > #\\34 2").should("be.visible").click(); 
    cy.get("#widget2").should("be.visible"); 
    cy.get(".br-button > .icon").should("be.visible").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist"); 
  });

  it("Como participar", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(".menu-body > :nth-child(2) > #\\34 3").should("be.visible").click(); 
    cy.get('[style="margin-bottom: 200px;"] > .contrast-ignore-bg').should("be.visible"); 
    cy.get(".br-button > .icon").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Cursos", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(":nth-child(3) > #\\34 5").should("be.visible").click(); 
    cy.contains(
      "Nesta área, você acessa materiais de formação completos, como capacitações para educadores e cursos livres relacionados ao tema de trânsito."
    ).should("be.visible"); 
    cy.get(".br-button > .icon").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Projetos e Campanhas", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(":nth-child(4) > #\\34 6").should("be.visible").click(); 
    cy.contains("Projetos e Campanhas em Destaque").should("be.visible"); 
    cy.get(".br-button > .icon").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Atividades", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(":nth-child(5) > #\\34 8").should("be.visible").click(); 
    cy.contains("Ensino Fundamental").should("be.visible"); 
    cy.get(".br-button > .icon").should("be.visible").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Mensagens", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(":nth-child(6) > #\\35 0").should("be.visible").click(); 
    cy.get(":nth-child(3) > :nth-child(3) > a > .br-button").should(
      "be.visible"
    );
    cy.get(".br-button > .icon").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Minhas Práticas", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(":nth-child(7) > #\\35 7").should("be.visible").click(); 
    cy.contains("Minhas Práticas Pedagógicas").should("be.visible"); 
    cy.get(".br-button > .icon").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Praticas compartilhadas", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(":nth-child(8) > #\\35 8").should("be.visible").click();
    
    cy.contains("Práticas Compartilhadas").should("be.visible"); 
    cy.get(".br-button > .icon").should("be.visible").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Meus Planejamentos Pedagógicos", () => {
    cy.get(".header-menu > .br-button > .fas").should("be.visible").click(); 
    cy.get(":nth-child(9) > #\\31 058").should("be.visible").click(); 
    cy.get(".mb-3 > a > .br-button").should("be.visible"); 
    cy.get(".br-button > .icon").should("be.visible").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Perfil", () => {
    cy.get('[href="/conexao/perfil"]').click(); 
    cy.contains("Nome: Danillo Franklin Leite Lopes").should("be.visible"); 
    cy.get(".br-button > .icon").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });

  it("Iniciativas", () => {
    cy.get("#Iniciativas svg").should("be.visible").click(); 
    cy.get(".table-title").should("be.visible"); 
    cy.get(".br-button > .icon").click(); 
    cy.contains('Busque aqui atividades de Educação para o Trânsito').should("exist");
  });
});
