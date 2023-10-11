// cypress/e2e/locked-out-user-refactored.cy.js

// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// To remove the duplication in locked-out-user.cy.js spec, I would move code that selects elements and checks error state 
// into its own "page object" file cypress/e2e/login.page.js. By default Cypress uses *.cy.js spec pattern, 
// thus the login.page.js will NOT appear in the list of test specs.

// Notice how we return chained commands from getUsername, getPassword, etc methods. 
// This allows the test to attach its own assertions and commands.

// Tip: I did not move the command cy.get('[data-test="login-button"]').click() into the page object yet. 
// When I use the same command from other specs and find myself duplicating it, I would move it.

import { LoginPage } from '../page-objects/login.page'

it('shows a login error refactored', () => {
  cy.visit('/')
  LoginPage.getUsername().type('locked_out_user')
  LoginPage.getPassword().type('secret_sauce')
  // initially there should be no errors
  // Tip: code this section after finishing checking the errors
  LoginPage.noErrors()
  // click on the login button
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click()
  // confirm the page shows errors and stays on login URL
  cy.log('**shows errors**')
  LoginPage.getUsername().should('have.class', 'error')
  LoginPage.getPassword().should('have.class', 'error')
  cy.location('pathname').should('equal', '/')
  // confirm there is an error message
  // and click its "close" button after 1 second delay
  // https://on.cypress.io/contains
  // https://on.cypress.io/find
  // https://on.cypress.io/wait
  LoginPage.getError()
    .should('include.text', 'locked out')
    .and('be.visible')
    // wait 1 second for clarity
    .wait(1000)
    .find('button.error-button')
    .click()
  // confirm the errors go away, but the input fields are not cleared
  LoginPage.noErrors()
  LoginPage.getUsername().should('have.value', 'locked_out_user')
  LoginPage.getPassword().should('have.value', 'secret_sauce')
})