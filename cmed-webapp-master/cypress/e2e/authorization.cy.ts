import {
  checkLoading,
  loadPage,
  login,
  openSignin,
  openSignup,
  submitForm,
} from '../support/utils';

export {};
describe('Test for authorization', () => {
  it('Not exist account', () => {
    const firstName = Math.random().toString(12).substring(2, 10);
    loadPage();
    openSignin();
    login(firstName);
    submitForm();
  });

  it('Incorrect password', () => {
    const email = 'qa-test@clickmedicus.com';

    loadPage();
    openSignin();
    login(email);
    submitForm();
  });

  it('Success auth', () => {
    const email = 'qa-test@clickmedicus.com';
    const password = 'qatest123';

    loadPage();
    openSignin();
    login(email, password);
    submitForm();

    cy.then(() => {
      checkLoading();
      cy.get('.MuiBadge-root').click();
      cy.contains('Log out').click();
    });
  });

  it('Sign up without fullName', () => {
    const firstName = Math.random().toString(12).substring(2, 10);
    const password = Math.random().toString(12).substring(2, 10);
    const email = `${firstName}@gmail.com`;

    loadPage();
    openSignup();

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="passwordConfirm"]').type(password);

    submitForm();
  });

  it('Sign up without email', () => {
    const firstName = Math.random().toString(12).substring(2, 10);
    const lastName = Math.random().toString(12).substring(2, 10);
    const password = Math.random().toString(12).substring(2, 10);

    loadPage();
    openSignup();

    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="passwordConfirm"]').type(password);

    submitForm();
  });

  it('Sign up without password', () => {
    const firstName = Math.random().toString(12).substring(2, 10);
    const lastName = Math.random().toString(12).substring(2, 10);
    const email = `${firstName}@gmail.com`;

    loadPage();
    openSignup();

    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="email"]').type(email);

    submitForm();
  });

  it('Sign up without confirm password', () => {
    const firstName = Math.random().toString(12).substring(2, 10);
    const lastName = Math.random().toString(12).substring(2, 10);
    const password = Math.random().toString(12).substring(2, 10);
    const email = `${firstName}@gmail.com`;

    loadPage();
    openSignup();

    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    submitForm();
  });

  it('Create an account, log in, and then log out', () => {
    const firstName = Math.random().toString(12).substring(2, 10);
    const lastName = Math.random().toString(12).substring(2, 10);
    const password = Math.random().toString(12).substring(2, 10);
    const email = `${firstName}@gmail.com`;

    loadPage();
    openSignup();

    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="passwordConfirm"]').type(password);

    submitForm();

    openSignin('swap-');

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    submitForm();

    cy.then(() => {
      checkLoading();
      cy.get('.MuiBadge-root').click();
      cy.contains('Log out').click();
    });
  });
});
