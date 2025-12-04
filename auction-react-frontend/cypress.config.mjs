import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },
});
