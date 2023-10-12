import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '4oeqch',
  viewportHeight: 800,
  viewportWidth: 1280,

  env: {
    apiUrl: 'https://dev-api.clickmedicus.com',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
