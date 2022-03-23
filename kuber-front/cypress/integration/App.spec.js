/// <reference types="cypress" />

// Psychosis
function formatNumber(number, decimals) {
  let numArr = ((number < 0 ? number * -1 : number) + "").split('.');
  let numStr = numArr[0];
  let initLength = numStr.length;
  let commaPos;
  for (let i = 1; i * decimals < initLength; i++) {
    commaPos = numStr.length - (decimals * i + (i - 1));
    numStr = numStr.substring(0, commaPos) + "," + numStr.substring(commaPos, numStr.length);
  }
  if (number < 0) return "-" + numStr + (numArr.length > 1 ? '.' + numArr[1] : '');
  return numStr + (numArr.length > 1 ? '.' + numArr[1] : '');
  // same but less fun
  // return number.toLocaleString();
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
            value: 1200.50 + 100 * i,
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
        `[aria-label="Slice; Marketing ${formatNumber(1200.50 + 100 * i, 3)}"]`
      ).should("exist");
      cy.get(
        `[aria-label="Slice; Sales ${formatNumber(850 - 100 * i, 3)}"]`
      ).should("exist");
    }
  });
});
