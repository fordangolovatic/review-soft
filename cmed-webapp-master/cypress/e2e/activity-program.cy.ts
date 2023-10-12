import {
  loadPage,
  loadPageAndAuthorization,
  randomNum,
  restoreLocalStorage,
  saveLocalStorage,
  submitForm,
} from '../support/utils';

describe('Activity Program', () => {
  it('Authorization', () => {
    const email = 'qa-doctor@clickmedicus.com';
    const password = 'qatest123';

    loadPageAndAuthorization('/', {
      login: email,
      password,
    });

    saveLocalStorage('auth');
  });

  it('Adding new activity', () => {
    restoreLocalStorage('auth');
    loadPage('profile?tab=activity-program');

    const clickFirstEnabledButton = () => {
      cy.get('.MuiCalendarPicker-root', { timeout: 60000 })
        .should('be.visible')
        .find('#picker-day button:not([disabled])')
        .then(($buttons) => {
          cy.wrap($buttons[randomNum(28)]).click();
        });
    };

    cy.get('#next-month', { timeout: 60000 }).click();

    clickFirstEnabledButton();

    cy.get('#consultation-price').clear().type(randomNum(100).toString());

    cy.get('#time-selector')
      .find('button')
      .then(($buttons) => {
        for (let i = 0; i < 7; i++) {
          cy.wrap($buttons[randomNum(20)]).click();
        }
      });

    cy.intercept(
      'https://dev-api.clickmedicus.com/api/v1/account/activity-program',
    ).as('activityProgram');

    submitForm();
    cy.wait('@activityProgram');
  });
});
