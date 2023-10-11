// cypress/e2e/item.cy.js

// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// the markdown is as follows
//  <div class="inventory_container" class="inventory_container">
//    <div class="inventory_list"> flex
//      <div class="inventory_item">..</div> flex
//      <div class="inventory_item"> flex
//        <div class="inventory_item_img">
//        <div class="inventory_item_description">
//          <div class="inventory_item_label">
//            <a href="@" id="item_0_title_link">
//              <div class="inventory_item_name">Sauce Labs Bike Light</div>
//                "A red light isn't the desired state in testing but it sure helps when riding your bike at night"
//            </a>
//            <div class="inventory_item_desc">...</div>
//          </div>
//          <div class="pricebar">..</div> flex
//        </div>
//      </div>
//    </div>
//  </div>

// cypress/e2e/item.cy.js

beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})

it('has an item with details', () => {
  // confirm there is an item in the inventory
  // with:
  //   name: "Sauce Labs Bike Light"
  //   description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night"
  //   price: $9.99
  // https://on.cypress.io/contains
  // https://on.cypress.io/within
  cy.contains('.inventory_item', 'Sauce Labs Bike Light').within(() => {
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light')
    cy.contains(
      '.inventory_item_desc',
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night.",
    )
    cy.contains('.inventory_item_price', '$9.99')
  })
})