const { defineConfig } = require("cypress");
const fs = require("fs");
module.exports = defineConfig({
  projectId: "e97tc3",
  e2e: {
    setupNodeEvents(on, config) {
      // Adiciona a verificação de existência de arquivos
      on("task", {
        fileExists(filePath) {
          return fs.existsSync(filePath);
        },
        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Exclui o arquivo
            return true;
          }
          return false; // Se o arquivo não existir
        },
      });
    },
    video: true,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: false,
      code: true,
      timestamp: "mmddyyyy_HHMMss",
    },
    downloadsFolder: "cypress/downloads", // Define a pasta onde os arquivos serão salvos
  },
});
