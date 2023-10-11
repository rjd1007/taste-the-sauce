// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from '../../page-objects/login.page'

it('logs out', () => {
  LoginPage.login('standard_user', 'secret_sauce')
  cy.visit('/inventory.html')
  cy.location('pathname').should('equal', '/inventory.html')
  cy.contains('button', 'Open Menu').click()
  cy.get('.bm-menu-wrap')
    .should('be.visible')
    .contains('.menu-item', 'Logout')
    .click()
  cy.location('pathname').should('equal', '/')
  // we cannot go to the inventory again
  cy.visit('/inventory.html')
  LoginPage.showsError(
    "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  )
})