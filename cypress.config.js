const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  projectId: "e97tc3",
  retries: {
    runMode: 2, // Tenta novamente 2 vezes se o teste falhar no modo normal
    openMode: 2, // Tenta 2 vez se falhar no modo interativo (cypress open)
  },
  defaultCommandTimeout: 45000, // Aumenta o tempo limite padrão para comandos
  responseTimeout: 10000, // Timeout para respostas de requisições
  requestTimeout: 5000, // Tempo máximo de espera por requisições
  animationDistanceThreshold: 5, // Ignora pequenas animações para evitar falsos negativos

  e2e: {
    slowMo: 1000, // Torna os testes ligeiramente mais lentos para melhor visibilidade
    setupNodeEvents(on, config) {
      config.editor = "code"; // Define VS Code como editor padrão

      // Adiciona tarefas personalizadas para manipulação de arquivos
      on("task", {
        fileExists(filePath) {
          return fs.existsSync(filePath); // Verifica se o arquivo existe
        },
        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Exclui o arquivo
            return true;
          }
          return false; // Retorna falso se o arquivo não existir
        },
      });

      return config;
    },

    video: false, // Habilita gravação de vídeos dos testes
    videoCompression: 32, // Reduz o tamanho do vídeo sem perder qualidade

    reporter: "mochawesome", // Define Mochawesome como gerador de relatórios
    reporterOptions: {
      reportDir: "cypress/reports", // Pasta onde os relatórios serão salvos
      overwrite: true, // Permite sobrescrever relatórios antigos
      html: true, // Gera relatório em HTML
      json: true, // Gera relatório em JSON
      autoOpen: false, // Abre o relatório automaticamente após os testes
      charts: true, // Adiciona gráficos ao relatório
    },
    
  viewportWidth: 1920,  // Largura da janela
  viewportHeight: 1080,  // Altura da janela


    screenshotsFolder: "cypress/reports/screenshots", // Define a pasta de screenshots
    downloadsFolder: "cypress/downloads", // Define a pasta de downloads
  },

});
