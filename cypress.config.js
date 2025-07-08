const { defineConfig } = require("cypress");
const fs = require("fs");
const Papa = require("papaparse");

module.exports = defineConfig({
  projectId: "e97tc3",

reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
    autoOpen: false,
    charts: true,
  },

  retries: {
    runMode: 2,
    openMode: 2,
  },

  defaultCommandTimeout: 30000,
  responseTimeout: 10000,
  requestTimeout: 5000,
  animationDistanceThreshold: 5,

  e2e: {
    setupNodeEvents(on, config) {
      config.editor = "code";

    require('cypress-mochawesome-reporter/plugin')(on);

      on("task", {
        fileExists(filePath) {
          return fs.existsSync(filePath);
        },
        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
          }
          return false;
        },
        parseCsv({ filePath }) {
          const csv = fs.readFileSync(filePath, "utf8");
          return new Promise((resolve) => {
            Papa.parse(csv, {
              header: true,
              delimiter: ";",
              skipEmptyLines: true,
              complete: (results) => resolve(results.data),
            });
          });
        },
      });

      return config;
    },

    video: false,
    videoCompression: 32,
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotsFolder: "cypress/reports/screenshots",
    downloadsFolder: "cypress/downloads",
  },
});
