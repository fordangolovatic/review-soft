import {
  isSuccess,
  loadPage,
  loadPageWithInterceptor,
  openSignin,
  randomNum,
  restoreLocalStorage,
  saveLocalStorage,
  submitForm,
  waitInterceptors,
} from '../support/utils';

export {};

const interceptors = [
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/messages',
    name: 'Messages',
  },
];
const usersInterceptor = {
  url: 'https://dev-api.clickmedicus.com/api/v1/users',
  name: 'Users',
};
const messagesToUserInterceptor = {
  url: 'https://dev-api.clickmedicus.com/api/v1/messages/*',
  name: 'MessagesToUser',
};
describe('Profile messages', () => {
  const keyMessage = Math.random().toString().substring(1, 6);

  it('Log in to work with a messages', () => {
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

  it('Testing sending a message to any user from the list', () => {
    restoreLocalStorage('auth').then(() => {
      loadPageWithInterceptor('profile?tab=messages', interceptors);
    });

    cy.intercept(usersInterceptor.url).as(usersInterceptor.name);

    cy.get('button[name="write-message-modal"]')
      .should('be.visible')
      .click()
      .wait(`@${usersInterceptor.name}`, { timeout: 6000 });

    cy.get('input[id="user-list"]').click();
    cy.get('ul[id="user-list-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get('li[id^="user-list-option-"]').eq(randomNum(length)).click();
      });

    cy.get('input[name="subject"]').clear().type(`Test QA Subject: ${keyMessage}`);
    cy.get('textarea[name="content"]')
      .clear()
      .type('This message does not need to be answered, this is a test message');

    submitForm().then(() => {
      isSuccess('Message sent');
    });
  });

  it('Open sent message and send test message', () => {
    restoreLocalStorage('auth');
    loadPage('profile?tab=messages');

    cy.intercept(messagesToUserInterceptor.url).as(messagesToUserInterceptor.name);

    cy.contains(`Test QA Subject: ${keyMessage}`)
      .click()
      .then(() => {
        cy.wait(`@${messagesToUserInterceptor.name}`);
      });

    cy.get('textarea[name="write-message-area"]')
      .clear()
      .type(`Test QA write message: ${keyMessage}`);

    cy.get('button[name="send-message"]')
      .click()
      .then(() => {
        isSuccess('Message sent');
      });
  });
});
