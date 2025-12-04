describe("Home Page E2E Test", () => {
  it("loads the home page and displays title", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("All Auction Items").should("be.visible");
  });
});

it('Testing homepage', function() {
  cy.visit('http://localhost:3000')
  cy.get('#root div:nth-child(2) a[href="/"]').click();
  cy.get('#root a[href="/login"]').click();
  cy.get('#root div:nth-child(2) > a[href="/register"]').click();
  cy.get('#root div:nth-child(2) > a[href="/login"]').click();
  
});

