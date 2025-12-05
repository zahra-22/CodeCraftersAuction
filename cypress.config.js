const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,   // <-- ADD THIS LINE
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
