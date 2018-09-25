// https://docs.cypress.io/api/introduction/api.html

describe('Chuck Norris Jokes', () => {
  it('should open jokes view when category is clicked', () => {
    cy.visit('/');
    cy.get('.category').contains('movie').click();

    cy.url().should('include', '/movie');
    cy.get('.selected-category').should('contain', 'movie');
    cy.get('.joke').should('exist');
  });
});
