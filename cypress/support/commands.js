import 'cypress-file-upload';

Cypress.Commands.add("setLocalStorage", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("session", JSON.stringify(Cypress.env("token")));
      win.localStorage.setItem("user", JSON.stringify(Cypress.env("user")));
    });
  });

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command -
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })