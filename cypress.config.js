const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      supportFile: './cypress/support/e2e.ts'
    },
    //intercept-api
    //test-api
    //test-ui
    specPattern:"./cypress/Testcase/test-ui/**.*",
    
  },
});
