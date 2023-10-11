const { defineConfig } = require('cypress')
const registerDataSession = require('cypress-data-session/src/plugin')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      registerDataSession(on, config)
      return config
    },
  }
})
