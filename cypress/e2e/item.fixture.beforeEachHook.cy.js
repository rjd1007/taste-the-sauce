// cypress/e2e/item.fixture.beforeEachHook.cy.js

// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// Tip: use cy.fixture command to load the JSON fixture object, then pass the loaded data to your 
// callback function to use when verifying the page:
//  cy.fixture('path/to/fixture')
//    .then(data => {
//      cy.contains('...', data.name)
//  })

beforeEach(() => {
    cy.log('**log in**')
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
    // load the bike light JSON fixture file
    // https://on.cypress.io/fixture
    // and save the loaded item under alias "item"
    // https://on.cypress.io/as
    cy.fixture('bike-light.json').as('item')
  })
  
  // access the existing alias "item" inside the function callback
  // using the "this.item" syntax
  it('has an item with details', function () {
    // and confirm there is an item in the inventory
    // with the name, description, and price listed in the fixture object
    // https://on.cypress.io/contains
    // https://on.cypress.io/within
    cy.contains('.inventory_item', this.item.name).within(() => {
      cy.contains('.inventory_item_name', this.item.name)
      cy.contains('.inventory_item_desc', this.item.description)
      cy.contains('.inventory_item_price', this.item.price)
    })
  })