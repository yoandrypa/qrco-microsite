describe('QR sample test', () => {
  it('Visits microsite samples', () => {
    cy.visit('http://localhost:3000')
    cy.contains('SOCIAL').click()

    cy.url().should('include', '/sample/social')
  })
})

export {}
