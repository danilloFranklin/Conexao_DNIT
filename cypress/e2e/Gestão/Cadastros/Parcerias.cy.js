import { faker } from "@faker-js/faker";
describe("Parcerias", () => {

  {
    const Foto_teste = "Foto_teste.jpg";
    const fileName = "parcerias.csv"; // Nome do arquivo esperado
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
      cy.get('a[href="/conexao/gestao/parcerias"] span').click();
      cy.contains('span', 'DETRAN ALAGOAS').eq(0);
    });
    
    it("Filtrar e limpar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/parcerias"] span').click();
      cy.contains('span', 'DETRAN ALAGOAS').eq(0).should('be.visible');
      cy.get('input#input_state').click();
      cy.contains('label', 'BA').click();
      cy.wait(600);
      cy.get('input#input_city').should("be.visible").click().clear().type("Érico Cardoso");
      cy.wait(600);
      cy.contains('label', 'Érico Cardoso').click();
      cy.get('input#input_entity').should("be.visible").type("DETRAN ALAGOAS");
      cy.contains('label', 'DETRAN ALAGOAS').click();
      cy.contains('label', 'Cadastradas').click();
      cy.contains('button', 'Buscar').click();
      cy.contains('td', 'Bahia Cardoso').should('be.visible');


    });

it("Buscar e limpar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/parcerias"] span').click();
      cy.contains('span', 'DETRAN ALAGOAS').eq(0).should('be.visible');
      cy.get('input#searchbox').type("Bahia Cardoso"); 
      cy.contains('button', 'Buscar').click();
      cy.contains('td', 'Bahia Cardoso').should("be.visible");
      cy.contains('button', 'Limpar').click();
      cy.contains('span', 'DETRAN ALAGOAS').eq(0).should('be.visible');
    });

    it("Editar e salvar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/parcerias"] span').click();
      cy.contains('span', 'DETRAN ALAGOAS').eq(0).should('be.visible');
      cy.get('input#searchbox').type("Bahia Cardoso"); 
      cy.contains('button', 'Buscar').click();
      cy.contains('td', 'Bahia Cardoso').should("be.visible");
      cy.get('i.fa-pen').click();
      cy.wait(1000);
      cy.get('input#title').clear().type(textocurto);
      cy.contains('button', 'Próxima').click();
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.contains('button', 'Limpar').click();
      cy.get('input#searchbox').clear().type(textocurto); 
      cy.contains('button', 'Buscar').click();
      cy.contains('td', textocurto).should("be.visible");
      cy.get('i.fa-pen').click();
      cy.wait(1000);
      cy.get('input#title').clear().type('Bahia Cardoso');
      cy.contains('button', 'Próxima').click();
      cy.get('button[type="submit"]').click();
      cy.get('input#searchbox').clear().type("Bahia Cardoso"); 
      cy.contains('button', 'Buscar').click();
      cy.contains('td', 'Bahia Cardoso').should("be.visible");
  

    });
 it("Cadastrar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/parcerias"] span').click();
      cy.contains('span', 'DETRAN ALAGOAS').eq(0).should('be.visible');
      cy.get('i.fa-plus').click();
      cy.wait(1000);
      cy.get('input#input_entitie').click();
      cy.contains('label', 'DETRAN ALAGOAS').click();
      cy.get('i.fa-plus').click();
      cy.contains('p', 'DETRAN ALAGOAS').should('be.visible');
      cy.get('input#title').type(textocurto);
      cy.get('textarea#description').type(textolongo);
      cy.get('input[type="file"]').attachFile(Foto_teste);
      cy.contains(Foto_teste).should("be.visible");
      cy.get('input#From').click();
      cy.get('.open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > .today').click();
      cy.contains('button', 'Próxima').click();
      cy.get('label[for="regional"]').click();
      cy.get('input#input_state').click();
      cy.contains('label', 'Minas Gerais').click();
      cy.get('i.fa-plus').eq(1).click();
      cy.contains('p', 'Minas Gerais').should('be.visible');
      cy.contains('button', 'Confirmar').click();
      cy.get('label[for="stateDependencies"]').click();
      cy.get('button[type="submit"]').click();
      cy.contains('td', textocurto).should('be.visible');
    
    });

    it("Baixar CSV", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/parcerias"] span').click();
      cy.contains('span', 'DETRAN ALAGOAS').eq(0).should('be.visible');
   
      cy.get('div.actions-trigger button').click();

      cy.readFile(filePath, { timeout: 90000 }).should("exist");

      // Faz o parse do CSV e valida se existe "Bahia Cardoso" na coluna "Identificação da Parceria"
      cy.task("parseCsv", { filePath }).then((rows) => {
        // Loga os dados lidos (opcional, para debug)

        const registroEncontrado = rows.find((row) =>
          row["Identificação da Parceria"]?.includes(
            "Bahia Cardoso"
          )
        );

        expect(
          registroEncontrado,
          'Bahia Cardoso não encontrado na coluna "Instituição"'
        ).to.exist;
      });

      // Exclui o arquivo após validação
      cy.task("deleteFile", filePath).should("equal", true);
    });

}

});
