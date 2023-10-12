import { loadPage } from '../support/utils';

describe('Testing language switching component properly', () => {
  describe('Testing language switching component properly', () => {
    it('Switch language', () => {
      loadPage();

      cy.get('#navlink-doctors')
        .should('be.visible')
        .find('h5')
        .invoke('text')
        .as('navLinkDoctorsValue');

      cy.get('#language-switch', { timeout: 60000 }).click();

      cy.get('[aria-labelledby="language-switch"]')
        .find('[tabindex="-1"]')
        .as('inactiveTabs');

      cy.get('@navLinkDoctorsValue').then((navLinkDoctorsValue) => {
        cy.get('@inactiveTabs')
          .first()
          .click()
          .then(() => {
            cy.get('@navLinkDoctorsValue').should('not.eq', navLinkDoctorsValue);
          });
      });
    });
  });
});
