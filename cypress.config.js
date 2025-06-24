const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/cypress/e2e/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation:false
  },
});
