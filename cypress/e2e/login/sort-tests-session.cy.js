// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// https://github.com/bahmutov/cypress-data-session
import 'cypress-data-session'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

// From the beforeEach hook let's start the data session that will keep the session cookie. 
// Tip: the data session plugin automatically stores in memory the value of the last Cypress command in the setup method.

beforeEach(() => {
  cy.dataSession({
    name: 'user session',
    setup() {
      cy.log('**log in**')
      cy.visit('/')
      cy.get('[data-test="username"]').type('standard_user')
      cy.get('[data-test="password"]').type('secret_sauce')
      cy.get('[data-test="login-button"]').click()
      cy.location('pathname').should('equal', '/inventory.html')
      // the value yielded by the last command
      // will be saved in memory as data session "user session"
      cy.getCookie('session-username').should('exist')
    },
    // the argument is the memory value of this data session use recreate to access it
    recreate(userCookie) {
      cy.setCookie('session-username', userCookie.value, userCookie)
      cy.visit('/inventory.html')
      // confirm we are logged in and not redirected to the root page
      cy.location('pathname').should('equal', '/inventory.html')
    },
    shareAcrossSpecs: true,
  })
})

// Tip: the plugin has several static methods to query and clear the data sessions. 
// For example, to see the cookie saved by the cy.dataSession command above, 
// execute Cypress.getDataSession('user session') from the DevTools console.

describe('sorting', () => {
  let userCookie
  beforeEach(() => {
    if (userCookie) {
      cy.setCookie('session-username', userCookie.value, userCookie)
      cy.visit('/inventory.html')
      // confirm we are logged in and not redirected to the root page
      cy.location('pathname').should('equal', '/inventory.html')
    } else {
      cy.log('**log in**')
      cy.visit('/')
      cy.get('[data-test="username"]').type('standard_user')
      cy.get('[data-test="password"]').type('secret_sauce')
      cy.get('[data-test="login-button"]').click()
      cy.location('pathname').should('equal', '/inventory.html')
      cy.getCookie('session-username')
        .should('exist')
        .then((c) => {
          userCookie = c
        })
    }
  })

  /**
   * Sorts item by price or name
   * @param {'lohi'|'hilo'|'az'|'za'} order
   */
  function sortBy(order) {
    // confirm the argument value at runtime
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
    cy.log(`**sort by ${order}**`)
    cy.get('[data-test="product_sort_container"]').select(order)
  }

  function getPrices() {
    return cy
      .get('.inventory_item_price')
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print('sorted prices %o')
  }

  function getNames() {
    return cy.get('.inventory_item_name').map('innerText').print('items %o')
  }

  it('by price lowest to highest', () => {
    sortBy('lohi')
    getPrices().should('be.ascending')
  })

  it('by price highest to highest', () => {
    sortBy('hilo')
    // confirm the item prices are sorted from highest to lowest
    getPrices().should('be.descending')
  })

  it('by name from A to Z', () => {
    sortBy('az')
    getNames().should('be.ascending')
  })

  it('by name from Z to A', () => {
    sortBy('za')
    getNames().should('be.descending')
  })
})
