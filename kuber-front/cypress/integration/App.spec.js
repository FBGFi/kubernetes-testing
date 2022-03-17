/// <reference types="cypress" />

function formatNumber(number, decimals) {
  let numStr = number + "";
  if (number < 0) {
    numStr = numStr.substring(1, numStr.length);
  }
  let initLength = numStr.length;
  for (let i = 1; i * decimals < initLength; i++) {
    numStr =
      numStr.substring(0, numStr.length - (decimals * i + (i - 1))) +
      "," +
      numStr.substring(numStr.length - (decimals * i + (i - 1)), numStr.length);
  }
  if (number < 0) return "-" + numStr;
  return numStr;
}

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
    // mock server
    cy.intercept(
      {
        method: "GET",
        path: "/api/data",
      },
      [
        {
          category: "Research",
          value: 0,
        },
        {
          category: "Marketing",
          value: 1200,
        },
        {
          category: "Sales",
          value: 850,
        },
      ]
    );
    cy.get('[role="figure"]').should("have.length", 3);
    cy.get('[aria-label="Slice; Research 0"]').should("exist");
    cy.get('[aria-label="Slice; Marketing 1,200"]').should("exist");
    cy.get('[aria-label="Slice; Sales 850"]').should("exist");
  });
  it("should update the chart when button clicked", () => {
    for (let i = 1; i < 5; i++) {
      cy.intercept(
        {
          method: "GET",
          path: "/api/data",
        },
        [
          {
            category: "Research",
            value: 1000 * i,
          },
          {
            category: "Marketing",
            value: 1200 + 100 * i,
          },
          {
            category: "Sales",
            value: 850 - 100 * i,
          },
        ]
      );
      cy.get("button").first().click();
      cy.get(
        `[aria-label="Slice; Research ${formatNumber(1000 * i, 3)}"]`
      ).should("exist");
      cy.get(
        `[aria-label="Slice; Marketing ${formatNumber(1200 + 100 * i, 3)}"]`
      ).should("exist");
      cy.get(
        `[aria-label="Slice; Sales ${formatNumber(850 - 100 * i, 3)}"]`
      ).should("exist");
    }
  });
});
