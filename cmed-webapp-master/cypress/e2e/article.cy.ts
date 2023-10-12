import {
  isSuccess,
  loadPage,
  loadPageWithInterceptor,
  openSignin,
  randomNum,
  restoreLocalStorage,
  saveLocalStorage,
  submitForm,
  loadPageAndAuthorization,
} from '../support/utils';

export {};

const handleFavoriteArticles = (remove?: boolean) => {
  restoreLocalStorage('auth');

  cy.intercept('https://dev-api.clickmedicus.com/api/v1/favorite-articles').as(
    'loadedFavoriteArticles',
  );
  loadPage('articles');

  cy.wait('@loadedFavoriteArticles');

  cy.intercept(
    remove
      ? 'https://dev-api.clickmedicus.com/api/v1/favorite-articles/remove/*'
      : 'https://dev-api.clickmedicus.com/api/v1/favorite-articles/add',
  ).as('favoriteArticle');

  cy.get('#favorite-article').should('be.visible').first().click();

  cy.wait('@favoriteArticle', { requestTimeout: 10000 });
};

const interceptors = [
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/language',
    name: 'Languages',
  },
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/specialities',
    name: 'Specialities',
  },
];

describe('Recommended articles testing', () => {
  it('Authorization', () => {
    const email = 'qa-doctor@clickmedicus.com';
    const password = 'qatest123';

    loadPageAndAuthorization('/', {
      login: email,
      password,
    });

    saveLocalStorage('auth');
  });

  it('Creating new article', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('articles', interceptors);

    cy.get('button[name="add-article"]', { timeout: 60000 })
      .should('be.visible')
      .click();

    cy.get('input[id="speciality-list"]').click();

    cy.get('ul[id="speciality-list-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get(`li[id="speciality-list-option-${randomNum(length)}"]`).click();
      });

    cy.get('input[id="language-list"]').click();
    cy.get('ul[id="language-list-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get(`li[id="language-list-option-${randomNum(length)}"]`).click();
      });

    cy.get('input[name="title"]')
      .should('be.visible')
      .type('This is QA Testing title');
    cy.get('textarea[name="content"]')
      .should('be.visible')
      .type('This is QA Testing body');

    cy.get('button[name="modal-publish"]').click();

    isSuccess('Your question has been successfully created.');
  });

  it('Saving article to favorites', () => handleFavoriteArticles());
  it('Removing article from favorites', () => handleFavoriteArticles(true));
});
