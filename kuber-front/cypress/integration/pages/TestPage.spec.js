/// <reference types='cypress' />

describe('TestPage testing', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/test');
	});
	it('should render TestPage', () => {
		cy.get('.TestPage').should('exist');
	})
});
