import { faker } from "@faker-js/faker";
describe("Instituições de Ensino", () => {

  {
    const Foto_teste = "Foto_teste.jpg";
    const fileName = "lista_instituicoes.csv"; // Nome do arquivo esperado
    const filePath = `cypress/downloads/${fileName}`;
    const textocurto = `Automação - ${faker.lorem.words(2)}`;
    const telefoneValido = faker.phone.number("(##) #########");
    const emailValido = faker.internet.email();
    const numeroAleatorio = Math.floor(10000000 + Math.random() * 90000000);
    const cepValido = "76995970";

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

it("Buscar e limpar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/entidades"] span').click();
      cy.contains('td', 'DETRAN ALAGOAS').should("be.visible");
      cy.get('input#searchbox').type("Entidade Automação"); 
      cy.contains('button', 'Buscar').click();
      cy.contains('td', 'Entidade Automação').should("be.visible");
      cy.contains('button', 'Limpar').click();
      cy.contains('td', 'DETRAN ALAGOAS').should('be.visible');
    });

    it("Editar e salvar", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/entidades"] span').click();
      cy.contains('td', 'DETRAN ALAGOAS').should("be.visible");
      cy.get('input#searchbox').type("Entidade Automação"); 
      cy.contains('button', 'Buscar').click();
      cy.contains('td', 'Entidade Automação').should("be.visible");
      cy.get('i.fa-pen').click();
      cy.wait(1000);
      cy.get('input#identification').clear().type(textocurto);
      cy.contains('button', 'Próxima').click();
      cy.get('button[type="submit"]').click();

      cy.get('input#searchbox').clear().type(textocurto); 
      cy.contains('button', 'Buscar').click();
      cy.contains('td', textocurto).should("be.visible");
      cy.get('i.fa-pen').click();
      cy.wait(1000);
      cy.get('input#identification').clear().type('Entidade Automação');
      cy.contains('button', 'Próxima').click();
      cy.get('button[type="submit"]').click();
      cy.contains('button', 'Limpar').click();
      cy.wait(1000);
      cy.contains('td', 'Entidade Automação').should("be.visible");
      
    });

 it("Cadastrar e excluir", () => {
      cy.visit("https://conexao-dnit-hom.labtrans.ufsc.br/conexao/gestao/");
      cy.get('button[data-toggle="menu"]').click();
      cy.contains("span", "Cadastros").click();
      cy.get('a[href="/conexao/gestao/entidades"] span').click();
      cy.contains('td', 'DETRAN ALAGOAS').should("be.visible");
      cy.get('i.fa-plus').click();
      cy.wait(1000);
      cy.get('input#identification').type(textocurto);
      cy.get('input#email').type(emailValido);
      cy.get('input[type="text"]').eq(2).type(telefoneValido)
      cy.get('input#zipCode').type(cepValido);
      cy.wait(600);
      cy.contains('p', 'Logradouro*: Avenida Itália Cautiero Franco').should("be.visible");
      cy.get('input[type="file"]').attachFile(Foto_teste);
      cy.contains(Foto_teste).should("be.visible");
      cy.get('input#number').type('500');
      cy.wait(1000);
      cy.contains('button', 'Próxima').click();
      cy.get('label[for="regional"]').click();
      cy.get('input#input_state').should('be.visible').click();
      cy.contains('label', 'Minas Gerais').should('exist').click();
      cy.get('i.fa-plus').click();
      cy.contains('button', 'Confirmar').click();
      cy.get('button[type="submit"]').click();
      cy.contains('td', textocurto);

      cy.get('input#searchbox').type(textocurto);
      cy.contains('button', 'Buscar').click();
      cy.wait(1000);
      cy.contains('td', textocurto).should("be.visible");
      cy.get('i.fa-trash').click();
      cy.wait(600);
      cy.contains('button', 'Sim').click();
      cy.get('input#searchbox').clear().type(textocurto);
      cy.contains('button', 'Buscar').click();
      cy.wait(1000);
      cy.contains('td', 'Nenhum registro encontrado').closest('tr').find('td').should('be.visible')



      // validar o icone com o texto de que a busca que eu fiz não retornou nada.


    


      
    });
}
});
