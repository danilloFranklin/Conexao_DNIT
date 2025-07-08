// merge-reports.js
const marge = require('mochawesome-report-generator');
const mochawesomeMerge = require('mochawesome-merge');
const path = require('path');

(async () => {
  const reportDir = path.join(__dirname, 'cypress', 'reports');

  try {
    const jsonReport = await mochawesomeMerge.merge({
      files: [`${reportDir}/*.json`],
    });

    await marge.create(jsonReport, {
      reportDir,
      reportFilename: 'final-report',
      inlineAssets: true,
      saveJson: false,
      charts: true,
    });

    console.log("✅ Relatório final gerado em: cypress/reports/final-report.html");
  } catch (err) {
    console.error("❌ Erro ao gerar relatório final:", err);
  }
})();
