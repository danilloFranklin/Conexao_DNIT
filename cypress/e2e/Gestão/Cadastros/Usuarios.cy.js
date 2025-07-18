import { faker } from "@faker-js/faker";
describe("Usuários", () => {
  {
    const Foto_teste = "Foto_teste.jpg";
    const fileName = "lista_usuarios.csv"; // Nome do arquivo esperado
    const filePath = `cypress/downloads/${fileName}`;
    const textocurto = `Automação - ${faker.lorem.words(2)}`;
    const telefoneValido = faker.phone.number("(##) #########");
    const emailValido = faker.internet.email();
    const numeroAleatorio = Math.floor(10000000 + Math.random() * 90000000);
    const cepValido = "76995970";
    const textolongo = faker.lorem.paragraphs(1);

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
      cy.get('a[href="/conexao/gestao/usuarios"] span').click();
      cy.contains('td', 'GESSE FERREIRA DIAS').should('be.visible');
    });
    it("Filtrar e Limpar", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/usuarios"] span').click();
        cy.contains('td', 'GESSE FERREIRA DIAS').should('be.visible');
        cy.get('input#input_federativeUnit').click();
        cy.contains('label', 'MG').click();
        cy.get('input#input_city').click();
        cy.contains('label', 'Bocaiúva').click();
        cy.get('label[for="active"]').click();
        cy.contains('button', 'Buscar').click()
        cy.contains('td', 'Sarah Connor').should('be.visible');
      });
      it("Buscar e Limpar", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/usuarios"] span').click();
        cy.contains('td', 'GESSE FERREIRA DIAS').should('be.visible');
        cy.get('input#searchbox').type('Sarah Connor');
        cy.contains('button', 'Buscar').click();
        cy.contains('td', 'Sarah Connor').should('be.visible');
        cy.contains('button', 'Limpar').click();
        cy.contains('td', 'GESSE FERREIRA DIAS').should('be.visible');
      });
      it("Alterar Perfil", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/usuarios"] span').click();
        cy.contains('td', 'GESSE FERREIRA DIAS').should('be.visible');
        cy.get('input#searchbox').type('Sarah Connor');
        cy.contains('button', 'Buscar').click();
        cy.contains('td', 'Sarah Connor').should('be.visible');
        cy.get('i[aria-describedby="tooltipEditar"]').click();
        cy.wait(700);
        cy.get('button[aria-label="Exibir lista"] i').click();
        cy.contains('label', 'AA - teste teste').click();
        cy.get('button[type="submit"]').click();
        cy.contains('td', 'AA - teste teste').closest('tr').find('td[data-th*="Perfil"]').should('be.visible');
        cy.get('i[aria-describedby="tooltipEditar"]').click();
        cy.wait(700);
        cy.get('button[aria-label="Exibir lista"] i').click();
        cy.contains('label', 'Professor').click();
        cy.get('button[type="submit"]').click();
        cy.contains('td', 'Professor').closest('tr').find('td[data-th*="Perfil"]').should('be.visible');
      });
      it("Inativar e ativar", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/usuarios"] span').click();
        cy.contains('td', 'GESSE FERREIRA DIAS').should('be.visible');
        cy.get('input#searchbox').type('Professor Usuário');
        cy.contains('button', 'Buscar').click();
        cy.get('i.fa-link').click();
        cy.wait(2000);
        cy.contains('span', 'Inativo').should('be.visible');
        cy.get('i.fa-link').click();
        cy.wait(2000);
        cy.contains('span', 'Ativo').should('be.visible');
      
      });
      it("Baixar CSV", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/usuarios"] span').click();
        cy.contains('td', 'GESSE FERREIRA DIAS').should('be.visible');
     
        cy.get('div.actions-trigger button').click();
  
        cy.readFile(filePath, { timeout: 90000 }).should("exist");
  
        // Faz o parse do CSV e valida se existe "Mansão Xavier" na coluna "Instituição"
        cy.task("parseCsv", { filePath }).then((rows) => {
          // Loga os dados lidos (opcional, para debug)
  
          const registroEncontrado = rows.find((row) =>
            row["Instituição"]?.includes(
              "Mansão Xavier"
            )
          );
  
          expect(
            registroEncontrado,
            'Mansão Xavier não encontrado na coluna "Instituição"'
          ).to.exist;
        });
  
        // Exclui o arquivo após validação
        cy.task("deleteFile", filePath).should("equal", true);
      });
  }
});
