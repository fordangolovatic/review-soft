import {
  isSuccess,
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
    url: 'https://dev-api.clickmedicus.com/api/v1/specialities',
    name: 'Specialities',
  },
];

describe('Test ask doctor page', () => {
  it('Log in to work with a articles', () => {
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

  it('Testing adding article as ask a doctor', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('ask-doctor', interceptors);

    cy.get('button[name="ask-a-doctor"]', { timeout: 60000 })
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

    cy.get('input[name="title"]').type('This is QA Testing title');
    cy.get('textarea[name="content"]').type('This is QA Testing body');

    cy.get('button[name="modal-publish"]').click();

    isSuccess('Your question has been successfully created.');
  });
});
