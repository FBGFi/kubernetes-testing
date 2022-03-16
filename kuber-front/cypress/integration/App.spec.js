/// <reference types="cypress" />

describe("App testing example", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("has 2 buttons", () => {
    cy.get("button").should("have.length", 2);
  });
  it("should modify text of button when clicked", () => {
    cy.get("button").first().should("have.text", "Add 0");
    cy.get("button").first().click();
    cy.get("button").first().should("have.text", "Add 1");
  });
  it("should have 3 segments in the chart", () => {
    cy.get('[role="figure"]').should("have.length", 3);
    cy.get('[aria-label="Slice; Research 0"]').should("have.length", 1);
  });
});
