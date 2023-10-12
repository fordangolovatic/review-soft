import {
  loadPage,
  loadPageWithInterceptor,
  openSignin,
  restoreLocalStorage,
  saveLocalStorage,
  submitForm,
} from '../support/utils';

export {};

const interceptors = [
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/account/professional-info',
    name: 'ProfessionalInfo',
  },
];

describe('Test as professional info', () => {
  it('Log in as a doctor and save localStorage for further testing', () => {
    const email = 'qa-doctor@clickmedicus.com';
    const password = 'qatest123';

    loadPage();

    openSignin();

    cy.get('input[name="email"]').should('be.visible').type(email);
    cy.get('input[name="password"]').type(password);

    submitForm().then(() => {
      saveLocalStorage('auth');
    });
  });

  it('Testing if adding work experience by typing works', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=professional-information', interceptors);

    cy.get('button[name="add-professional-experience"]')
      .should('be.visible')
      .click();

    cy.get('input[name="begin-work-date"]').type('May 2002');
    cy.get('input[name="end-work-date"]').type('July 2022');
    cy.get('input[name="position"]').type('QA tester');
    cy.get('input[name="organisation"]').type('Click Medicus');

    cy.get('button[name="modal-add-professional-experience"]').click();

    cy.wait(2000);
  });

  it('Switching operability', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=professional-information', interceptors);

    cy.get('button[name="add-professional-experience"]')
      .should('be.visible')
      .click();

    cy.get('input[name="begin-work-date"]').type('May 2002');
    cy.get('input[name="switch-working-now"]').click();
    cy.get('input[name="position"]').type('QA tester');
    cy.get('input[name="organisation"]').type('Click Medicus');

    cy.get('button[name="modal-add-professional-experience"]').click();

    cy.wait(2000);
  });

  it('Testing delete work experience', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=professional-information', interceptors);

    cy.get('button[name="delete-professional-experience"]')
      .should('be.visible')
      .first()
      .click();
  });
});
