import {
  loadPage,
  loadPageWithInterceptor,
  openSignin,
  randomNum,
  restoreLocalStorage,
  saveLocalStorage,
  submitForm,
} from '../support/utils';

export {};

const interceptors = [
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/language',
    name: 'Languages',
  },
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/country',
    name: 'Country',
  },
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/specialities',
    name: 'Specialities',
  },
];

const handleFavouriteMTI = (remove?: boolean) => {
  restoreLocalStorage('auth');

  cy.intercept('https://dev-api.clickmedicus.com/api/v1/favorite-doctors').as(
    'loadedFavoriteMTI',
  );
  loadPageWithInterceptor('mti/residents', interceptors);

  cy.wait('@loadedFavoriteMTI');

  cy.intercept(
    remove
      ? 'https://dev-api.clickmedicus.com/api/v1/favorite-doctors/remove/*'
      : 'https://dev-api.clickmedicus.com/api/v1/favorite-doctors/add',
  ).as('favoriteDoctors');

  cy.get('#favorite-mti', { timeout: 60000 }).should('be.visible').first().click();

  cy.wait('@favoriteDoctors', { requestTimeout: 60000 });
};

describe('MTI Testing', () => {
  it('Open departments and select department and set filters', () => {
    loadPageWithInterceptor('mti/residents', interceptors);
  });

  it('Applying filters', () => {
    loadPageWithInterceptor('mti/residents', interceptors);

    cy.get('#filter-collection', { timeout: 60000 })
      .should('be.visible')
      .then(() => {
        cy.get('[id^="collapse-menu-"]').each(($el) => {
          cy.wrap($el)
            .click()
            .then(() => {
              cy.get('[id^="collapse-menu-list"]').then(($list) => {
                cy.wrap($list)
                  .find('[id^="collapse-menu-option"]')
                  .should('have.length.gt', 0)
                  .then(($options) => {
                    const length = $options.length;
                    cy.wrap($options).eq(randomNum(length)).click();
                  });
              });
            });
        });
      });
  });

  it('Authorization', () => {
    const email = 'qa-doctor@clickmedicus.com';
    const password = 'qatest123';

    loadPage();

    openSignin();

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    submitForm().then(() => {
      saveLocalStorage('auth');
    });
  });

  it('Adding MTI to favourite', () => handleFavouriteMTI());
  it('Removing MTI from favourites', () => handleFavouriteMTI(true));
});
