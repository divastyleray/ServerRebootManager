describe('Schedule Reboot flow', () => {
  it('loads app, selects server, picks time and schedules', () => {
    cy.visit('/');
    cy.get('#server-select').should('exist');
    cy.get('#server-select').select('s1');
    const tomorrow = new Date(Date.now() + 24 * 3600 * 1000);
    const date = tomorrow.toISOString().slice(0, 10);
    cy.get('#reboot-date').type(date);
    cy.get('#reboot-time').type('03:00');
    cy.contains('Schedule Reboot').click();
    cy.contains('Scheduled:').should('exist');
  });
});
