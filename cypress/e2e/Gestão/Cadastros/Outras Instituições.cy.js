import { faker } from "@faker-js/faker";
describe("Outras Instituições", () => {
  {
    const fileName = "lista_outras_instituicoes.csv"; // Nome do arquivo esperado
    const filePath = `cypress/downloads/${fileName}`;
    const textocurto = `Automação - ${faker.lorem.words(2)}`;
    const telefoneValido = faker.phone.number("###########");
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
      cy.get('a[href="/conexao/gestao/outras-instituicoes"] span').click();
      cy.contains("td", "CEF SANTOS DUMONT").should("be.visible");
    });
    it("buscar e limpar", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/outras-instituicoes"] span').click();
        cy.contains("td", "CEF SANTOS DUMONT").should("be.visible");
    
        cy.get("input#searchbox").type("BULLY");
        cy.contains("button", "Buscar").click();
        cy.get('td[data-th="Instituição"]')
          .contains("BULLY")
          .should("be.visible");
        cy.contains("button", "Limpar").click();
        cy.contains("td", "CEF SANTOS DUMONT").should(
          "be.visible"
        );
      });
      it("Filtrar e limpar", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/outras-instituicoes"] span').click();
       cy.contains("td", "CEF SANTOS DUMONT").should("be.visible");
        cy.get('input#input_federativeUnit').click().type("MG");
        cy.contains('label', 'MG').click();
        cy.wait(1000);
        cy.get('input#input_city').type("Bocaiúva");
        cy.wait(1000);
        cy.contains('label', 'Bocaiúva').click();
       cy.get('input#input_administrativeDependency').click();
        cy.contains('label', 'Estadual').click();
        cy.wait(1000);
        cy.contains('button', 'Buscar').click();
        cy.contains('td', 'MANSÃO XAVIER').should("be.visible");
        cy.contains("button", "Limpar").click();
        cy.contains("td", "CEF SANTOS DUMONT").should(
          "be.visible"
        );
        });
      it("Baixar CSV", () => {
        cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
        cy.get('button[data-toggle="menu"]').click();
        cy.contains("span", "Cadastros").click();
        cy.get('a[href="/conexao/gestao/outras-instituicoes"] span').click();
        cy.contains("td", "CEF SANTOS DUMONT").should("be.visible")
     
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
      it("Editar e salvar", () => {
          cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
          cy.get('button[data-toggle="menu"]').click();
          cy.contains("span", "Cadastros").click();
          cy.get('a[href="/conexao/gestao/outras-instituicoes"] span').click();
          cy.contains("td", "CEF SANTOS DUMONT").should("be.visible")
            cy.get('input#searchbox').clear().type('CEF SANTOS DUMONT');
            cy.contains('button', 'Buscar').click();
            cy.get('i[aria-describedby="tooltipEditar"]').eq(0).click();
            cy.wait(500);
            cy.get('input#name').click().clear().type(textocurto);
            cy.get('input#phone').type(telefoneValido);
            cy.get('button[type="submit"]').click();
            cy.wait(1000);
            cy.get("input#searchbox").clear().type(textocurto);
            cy.contains("button", "Buscar").click();
            cy.contains(textocurto.toUpperCase()).should("be.visible");
            cy.get('i[aria-describedby="tooltipEditar"]').click();
            cy.wait(1000);
            cy.get('input#name').click().clear();
            cy.wait(1000);
            cy.get('input#name').type("CEF SANTOS DUMONT");
            cy.wait(1000);
            cy.get('button[type="submit"]').click();
            cy.get("input#searchbox").clear().type('CEF SANTOS DUMONT');
            cy.contains("button", "Buscar").click();
            cy.get('td[data-th="Instituição"]').contains('CEF SANTOS DUMONT').should("be.visible");
          
        });
        it("Cadastrar e excluir", () => {
          const getNumeroAleatorio = () => Math.floor(Math.random() * 101); // 0 a 100
  
          cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
          cy.get('button[data-toggle="menu"]').click();
          cy.contains("span", "Cadastros").click();
          cy.get('a[href="/conexao/gestao/outras-instituicoes"] span').click();
          cy.contains("td", "CEF SANTOS DUMONT").should("be.visible")
          cy.get('div.justify-content-between button').click();
          cy.get('input#name').type(textocurto);
          cy.get('input#email').type(emailValido);
          cy.get('input#phone').type(telefoneValido);
          cy.contains('label', 'Estadual').click();
          cy.get('input#zipCode').type("76995970");
          cy.contains('p', 'Logradouro*: Avenida Itália Cautiero Franco').should('be.visible');
          cy.get('input#number').type(numeroAleatorio);
          cy.get('button[type="submit"]').click();
          cy.get('input#searchbox').type(textocurto)
         cy.contains('button', 'Buscar').click();
        cy.get('td[data-th="Instituição"]').contains(textocurto.toUpperCase()).should('be.visible');
        cy.get('i.fa-trash').eq(0).click();
        cy.contains('button', 'Sim').click();
        cy.get('input#searchbox').clear().type(textocurto)
        cy.contains('button', 'Buscar').click();
        cy.wait(500);    
        cy.contains('td', 'Nenhum registro encontrado').closest('tr').find('td').should("be.visible");
        cy.wait(1000);
    
    });
    }
  });
  