const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000, // Define o tempo limite padrão para 10 segundos
  e2e: {
    setupNodeEvents(on, config) {
      // Adicione eventos do Cypress aqui
    },
  },
});
