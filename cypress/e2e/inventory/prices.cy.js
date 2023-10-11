// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('confirms the item with the lowest price', () => {
  cy.visit('/')
  // Tip: grab the username and the password from the login page
  // It is ok for now to hardcode it in the spec source here
  //
  // get the username field and type the standard user
  // https://on.cypress.io/get
  // https://on.cypress.io/type
  cy.get('[data-test="username"]').type('standard_user')
  // get the password field and type the password
  cy.get('[data-test="password"]').type('secret_sauce')
  // get the login button and click on it
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click()
  // you should transition to the inventory page
  // https://on.cypress.io/location
  // see assertion examples at
  // https://glebbahmutov.com/cypress-examples/commands/location.html
  cy.location('pathname').should('equal', '/inventory.html')
  // once the inventory loads, grab the item prices
  // https://on.cypress.io/get
  // https://on.cypress.io/find
  cy.get('.inventory_list')
    .should('be.visible')
    .find('.inventory_item_price')
    .should('have.length.greaterThan', 3)
    // from each price element, get its inner text
    // and log it to the DevTools console
    // https://on.cypress.io/then
    // Tip: find how using https://cypress.tips/search
    // Tip 2: Cypress._.map is really universal
    .then((list) => Cypress._.map(list, 'innerText'))
    .then(console.log)
    // each price string has "$" character in front
    // remove it using string "substr" method
    .then((list) => Cypress._.map(list, (s) => s.substr(1)))
    .then(console.log)
    // convert each price string into a Number
    .then((list) => Cypress._.map(list, Number))
    .then(console.log)
    // find the smallest price number using Cypress._.min
    .then((list) => Cypress._.min(list))
    .then(console.log)
    // and confirm it is 7.99
    .should('equal', 7.99)
})

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

it('confirms the item with the lowest price (cypress-map)', () => {
  cy.visit('/')
  // Tip: grab the username and the password from the login page
  // It is ok for now to hardcode it in the spec source here
  //
  // get the username field and type the standard user
  // https://on.cypress.io/get
  // https://on.cypress.io/type
  cy.get('[data-test="username"]').type('standard_user')
  // get the password field and type the password
  cy.get('[data-test="password"]').type('secret_sauce')
  // get the login button and click on it
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click()
  // you should transition to the inventory page
  // https://on.cypress.io/location
  // see assertion examples at
  // https://glebbahmutov.com/cypress-examples/commands/location.html
  cy.location('pathname').should('equal', '/inventory.html')
  // confirm the inventory page really loads
  // and the lowest price is 7.99
  // Use utility queries from cypress-map plugin
  // https://github.com/bahmutov/cypress-map
  cy.get('.inventory_list')
    .should('be.visible')
    .find('.inventory_item_price')
    .should('have.length.greaterThan', 3)
    .map('innerText') // ["$1.00". "$2.00", ...]
    .print()
    .mapInvoke('substr', 1) // ["1.00". "2.00", ...]
    .print()
    .map(Number) // [1.00. 2.00, ...]
    .print()
    .apply(Cypress._.min) // 1.00 (min item in the array)
    .should('equal', 7.99)
})