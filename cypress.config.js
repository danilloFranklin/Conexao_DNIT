const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  projectId: "e97tc3",
  defaultCommandTimeout: 50000, // Define o tempo limite padrão para 50 segundos
  browser: "chrome",
  
  e2e: {
    setupNodeEvents(on, config) {
      config.editor = "code"; // Define VS Code como editor padrão
      
      // Adiciona tarefas personalizadas
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

    video: true, // Habilita gravação de vídeo dos testes
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: false,
      timestamp: "mmddyyyy_HHMMss",
    },

    downloadsFolder: "cypress/downloads", // Define a pasta de downloads
  },
});
