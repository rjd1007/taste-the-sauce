// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('shows a login error', () => {
  cy.visit('/')
  cy.get('[data-test="username"]').type('locked_out_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  // initially there should be no errors
  // Tip: code this section after finishing checking the errors
  cy.log('**there are no errors**')
  cy.contains('[data-test=error]', 'locked out').should('not.exist')
  cy.get('[data-test="username"]').should('not.have.class', 'error')
  cy.get('[data-test="password"]').should('not.have.class', 'error')
  // click on the login button
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click()
  // confirm the page shows errors and stays on login URL
  cy.log('**shows errors**')
  cy.get('[data-test="username"]').should('have.class', 'error')
  cy.get('[data-test="password"]').should('have.class', 'error')
  cy.location('pathname').should('equal', '/')
  // confirm there is an error message
  // and click its "close" button after 1 second delay
  // https://on.cypress.io/contains
  // https://on.cypress.io/find
  // https://on.cypress.io/wait
  cy.contains('[data-test=error]', 'locked out')
    .should('be.visible')
    // wait 1 second for clarity
    .wait(1000)
    .find('button.error-button')
    .click()
  // confirm the errors go away, but the input fields are not cleared
  cy.log('**errors go away**')
  cy.contains('[data-test=error]', 'locked out').should('not.exist')
  cy.get('[data-test="username"]')
    .should('not.have.class', 'error')
    .and('have.value', 'locked_out_user')
  cy.get('[data-test="password"]')
    .should('not.have.class', 'error')
    .and('have.value', 'secret_sauce')
})
