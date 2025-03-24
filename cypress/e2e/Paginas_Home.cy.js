describe("Paginas iniciais", () => {
  beforeEach(() => {
    cy.visit(cypress.env(BASE_URL)); // Acesse a página antes de setar o localStorage
    cy.viewport(1920, 1080);
    cy.window().then((win) => {
      // Inserindo session no LocalStorage
      win.localStorage.setItem(
        "session",
        JSON.stringify({
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InN1YiI6IjExOTgwMzI0NjQ2IiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYW1yIjpbInBhc3N3ZCIsImNhcHRjaGEiXSwicHJvZmlsZSI6Imh0dHBzOi8vc2Vydmljb3Muc3RhZ2luZy5hY2Vzc28uZ292LmJyLyIsImtpZCI6InJzYTEiLCJpc3MiOiJodHRwczovL3Nzby5zdGFnaW5nLmFjZXNzby5nb3YuYnIvIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoidHJ1ZSIsInByZWZlcnJlZF91c2VybmFtZSI6IjExOTgwMzI0NjQ2Iiwibm9uY2UiOiJQVDEydWZjcCIsInBpY3R1cmUiOiJodHRwczovL3Nzby5zdGFnaW5nLmFjZXNzby5nb3YuYnIvdXNlcmluZm8vcGljdHVyZSIsImF1ZCI6ImNvbmV4YW8tZG5pdC1ob20ubGFidHJhbnMudWZzYy5iciIsImF1dGhfdGltZSI6MTc0MjMwMTY0Nywic2NvcGUiOlsicGhvbmUiLCJvcGVuaWQiLCJwcm9maWxlIiwiZ292YnJfZW1wcmVzYSIsImVtYWlsIl0sIm5hbWUiOiJEYW5pbGxvIEZyYW5rbGluIExlaXRlIExvcGVzIiwicGhvbmVfbnVtYmVyIjoiMzE5OTc5MTAwMTAiLCJleHAiOjE3NDIzMDIyNDcsImlhdCI6MTc0MjMwMTY0NywianRpIjoiYTZjMzQwNjktOWUyOC00MTVkLWIyNjMtYWYwMWRhM2VhNWQ1IiwiZW1haWwiOiJkYW5pbGxvZmxsQGdtYWlsLmNvbSJ9LCJpYXQiOjE3NDIzMDE4ODIsImV4cCI6MTkwMDA4OTg4Mn0.tgMKKCTBhT0Wzu5WmPn1VpLPsePqm4LK8g3ZQ_Bc3ak",
          picture:
            "data:image/*;base64,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",
          expires_in: "1900089882000",
        })
      );

      // Inserindo user no LocalStorage
      win.localStorage.setItem(
        "user",
        JSON.stringify({
          educationalInstitution: { id: null },
          schoolBonds: { id: null },
          birthDate: "1994-12-17",
          id: 7576,
          idCity: 2322,
          idRole: 3,
          idDnitUnit: null,
          active: true,
          cpf: "119.803.246-46",
          email: "danillofll@gmail.com",
          name: "Danillo Franklin Leite Lopes",
          primeiroAcessoGovbr: "2025-02-20T17:14:44.713Z",
          remainAnonymous: false,
          numberOfAccess: 1404,
          sendMailAuthorization: true,
          city: {
            id: 2322,
            name: "Bocaiúva",
            state: { id: 21, name: "Minas Gerais", initials: "MG" },
          },
          phones: [{ id: 39712, idPhoneType: 1, DDD: "31", number: 997910010 }],
          attachment: [],
          DnitUnit: null,
          instituitions: [{ id: 336817, name: "Bully" }],
          actionCities: [],
          actionUFs: [],
          category: {
            id: 4,
            name: "Professor",
            occupation: null,
            entitiesLinked: [],
          },
          institutions: [
            {
              idInstitutionReference: null,
              idInstitution: "336817",
              name: "Bully",
              address: {
                id: 297390,
                city: {
                  id: 2322,
                  name: "Bocaiúva",
                  state: { id: 21, name: "Minas Gerais", initials: "MG" },
                },
              },
            },
          ],
          schoolYears: [{ id: 10, ordinal: 1, idTeachingModality: 1 }],
          disciplines: [{ id: 17, name: "História", idTeachingModality: 1 }],
          permissions: [
            "atividades_do_ensino_medio_listar",
            "atividades_do_ensino_fundamental_listar",
            "priorizacao_de_iniciativas_visualizar",
            "mensagens_listar",
            "mensagens_excluir",
            "projetos_e_campanhas_publica_excluir_comentario_proprio",
            "priorizacao_de_iniciativas_listar",
            "projetos_e_campanhas_publica_comentar",
            "mensagens_enviarresponder",
            "priorizacao_de_iniciativas_gerar_arquivo",
            "atividades_do_ensino_fundamental_excluir_comentario_proprio",
            "cursos_publica_classificar",
            "cursos_publica_comentar",
            "minhas_praticas_listar",
            "minhas_praticas_enviar",
            "praticas_compartilhadas_publica_comentar",
            "minhas_praticas_salvarconcluirconfirmar",
            "meus_planejamentos_pedagogicos_gerar_arquivo",
            "meus_planejamentos_pedagogicos_enviar",
            "acoes_de_projetos_ou_campanhas_publica_excluir_comentario",
            "atividades_do_ensino_medio_enviar",
            "projetos_e_campanhas_publica_classificar",
            "praticas_compartilhadas_publica_excluir_comentario_proprio",
            "atividades_do_ensino_medio_excluir_comentario_proprio",
            "meus_planejamentos_pedagogicos_listar",
            "meus_planejamentos_pedagogicos_salvarconcluirconfirmar",
            "iniciativas_listar",
            "acoes_de_projetos_ou_campanhas_publica_comentar",
            "mensagens_visualizar",
            "atividades_do_ensino_fundamental_enviar",
            "atividades_do_ensino_fundamental_comentar",
            "atividades_do_ensino_medio_gerar_arquivo",
            "iniciativas_salvarconcluirconfirmar",
            "atividades_do_ensino_medio_avaliar",
            "acoes_de_projetos_ou_campanhas_publica_excluir_comentario_proprio",
            "iniciativas_visualizar",
            "cursos_publica_excluir_comentario_proprio",
            "atividades_do_ensino_medio_comentar",
            "atividades_do_ensino_fundamental_avaliar",
            "minhas_praticas_visualizar",
            "meus_planejamentos_pedagogicos_copiar",
            "meus_planejamentos_pedagogicos_editar",
            "atividades_do_ensino_fundamental_gerar_arquivo",
            "iniciativas_enviar",
            "acoes_de_projetos_ou_campanhas_publica_classificar",
            "priorizacao_de_iniciativas_salvarconcluirconfirmar",
          ],
          menus: {
            cms: [
              {
                id: 41,
                name: "Pagina Inicial",
                order: 0,
                link: "/",
                env: "Gestao",
                submenus: [],
              },
              {
                id: 2,
                name: "Materiais",
                order: 3,
                env: "Gestao",
                submenus: [
                  {
                    id: 52,
                    name: "Priorização de Iniciativas",
                    order: 10,
                    link: "/iniciativas/priorizacao",
                  },
                ],
              },
            ],
            portal: [
              {
                id: 42,
                name: "Sobre - Conexão DNIT",
                order: 0,
                link: "/sobre",
                env: "Portal",
                submenus: [],
              },
              {
                id: 43,
                name: "Como Participar",
                order: 1,
                link: "/como-participar",
                env: "Portal",
                submenus: [],
              },
              {
                id: 45,
                name: "Cursos",
                order: 3,
                link: "/cursos",
                env: "Portal",
                submenus: [],
              },
              {
                id: 46,
                name: "Projetos e Campanhas",
                order: 4,
                link: "/projetos",
                env: "Portal",
                submenus: [],
              },
              {
                id: 48,
                name: "Atividades",
                order: 6,
                link: "/atividades",
                env: "Portal",
                submenus: [],
              },
              {
                id: 50,
                name: "Mensagens",
                order: 8,
                link: "/mensagens",
                env: "Portal",
                submenus: [],
              },
              {
                id: 57,
                name: "Minhas Práticas",
                order: 9,
                link: "/praticas",
                env: "Portal",
                submenus: [],
              },
              {
                id: 58,
                name: "Práticas Compartilhadas",
                order: 10,
                link: "/praticas-compartilhadas",
                env: "Portal",
                submenus: [],
              },
              {
                id: 1058,
                name: "Meus Planejamentos Pedagógicos",
                order: 11,
                link: "/planejamento-pedagogico",
                env: "Portal",
                submenus: [],
              },
            ],
          },
          role: {
            id: 3,
            name: "Professor",
            updateDate: "2025-01-31T16:13:56.677Z",
          },
        })
      );
    });
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
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Como participar", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(".menu-body > :nth-child(2) > #\\34 3").click();
    cy.get('[style="margin-bottom: 200px;"] > .contrast-ignore-bg').should(
      "be.visible"
    );
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Cursos", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(3) > #\\34 5").click();
    cy.contains(
      "Nesta área, você acessa materiais de formação completos, como capacitações para educadores e cursos livres relacionados ao tema de trânsito."
    ).should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Projetos e Campanhas", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(4) > #\\34 6").click();
    cy.contains("Projetos e Campanhas em Destaque").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Atividades", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(5) > #\\34 8").click();
    cy.contains("Ensino Fundamental").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Mensagens", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(6) > #\\35 0").click();
    cy.get(":nth-child(3) > :nth-child(3) > a > .br-button").should(
      "be.visible"
    );
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Minhas Práticas", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(7) > #\\35 7").click();
    cy.contains("Minhas Práticas Pedagógicas").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Praticas compartilhadas", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(8) > #\\35 8").click();
    cy.contains("Práticas Compartilhadas").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Meus Planejamentos Pedagógicos", () => {
    cy.get(".header-menu > .br-button > .fas").click();
    cy.get(":nth-child(9) > #\\31 058").click();
    cy.get(".mb-3 > a > .br-button").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Perfil", () => {
    cy.get('[href="/conexao/perfil"]').click();
    cy.contains("Nome: Danillo Franklin Leite Lopes").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });

  it("Iniciativas", () => {
    cy.get("#Iniciativas svg").click();
    cy.get(".table-title").should("be.visible");
    cy.get(".br-button > .icon").click();
    cy.get(".header-title-menu").should("be.visible");
  });
});
