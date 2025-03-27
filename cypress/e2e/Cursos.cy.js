import { faker } from "@faker-js/faker";

describe("Cursos", () => {
  const fileName = "home.pdf"; // Nome do arquivo esperado
  const filePath = `cypress/downloads/${fileName}`;
  const textoAleatorio = faker.lorem.sentence();

  beforeEach(() => {
    cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao");
    cy.viewport(1920, 1080);
    cy.setLocalStorage();
    cy.reload();

    // Verifica se a sessão e o usuário estão armazenados
    cy.window().its("localStorage.session").should("exist");
    cy.window().its("localStorage.user").should("exist");
  });

  const acessarMenuCursos = () => {
    cy.get("div.header-menu i").should("be.visible").click();
    cy.get("div.header-bottom div:nth-of-type(3) > a").should("be.visible").click();
    cy.contains("Teste Automação - Não excluir").should("be.visible");
  };

  it("Criar comentário", () => {
    acessarMenuCursos();
    cy.get("div.false > div:nth-of-type(1) div.w-100 img").should("exist").click();

    // Digita e publica um comentário
    cy.get("#txtComment").type(textoAleatorio);
    cy.get(".mt-sm-0").click();

    // Confirma que o comentário foi publicado
    cy.contains(textoAleatorio).should("be.visible");
  });

  it("Excluir comentário", () => {
    acessarMenuCursos();
    cy.get("div.false > div:nth-of-type(1) div.w-100 img").should("exist").click();

    // Verifica se o comentário existe antes de tentar excluir
    cy.contains(textoAleatorio).should("be.visible");

    // Melhorar o seletor do botão de exclusão (caso possível, prefira `data-testid`)
    cy.get('.br-item:nth-child(9) [alt="icon-trash"]').click();

    // Confirma que o comentário foi removido
    cy.contains(textoAleatorio).should("not.exist");
  });

  it("Baixar arquivo", () => {
    acessarMenuCursos();
    cy.contains("Teste Automação - Não excluir").click();
    cy.get(".clickable-item").click();

    // Aguarda o arquivo ser baixado
    cy.readFile(filePath, { timeout: 10000 }).should("exist");
    // Exclui o arquivo após teste
    cy.task("deleteFile", filePath).should("equal", true);
  });

  it("Acessar Curso", () => {
    acessarMenuCursos();
    cy.wait();
    cy.contains("Teste Automação - Não excluir").should("be.visible").click();

    // Remove o `target="_blank"` para abrir na mesma aba
    cy.get('[href*="/conexao/cursos/2"]')
      .should("have.attr", "target", "_blank")
      .invoke("removeAttr", "target")
      .click();

    // Confirma que a URL está correta
    cy.url().should("include", "/conexao/cursos/2");

    // Verifica se o curso foi carregado corretamente
    cy.get(".br-button > .icon").click();
    cy.contains("Busque aqui atividades de Educação para o Trânsito").should("be.visible");
  });
});
