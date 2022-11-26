describe('QR sample test', () => {
  it('Visits microsite samples', () => {
    cy.visit('http://localhost:3000')
    cy.contains('AUDIO').click()

    cy.url().should('include', '/sample/audio')
  })
})

export {}
