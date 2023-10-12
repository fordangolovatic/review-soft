import { loadPageAndAuthorization, randomNum, submitForm } from '../support/utils';

describe('', () => {
  it('', () => {
    const email = 'qa-patient@clickmedicus.com';
    const password = 'qatest123';

    loadPageAndAuthorization('profile?tab=medical-record', {
      login: email,
      password,
    });

    const resetSwitch = () => {
      cy.get('#gender-selector', { timeout: 60000 }).wait(3000);
      cy.get('[id^="active-"]', { timeout: 60000 }).each(($item) => {
        cy.wrap($item).wait(1000).click();
      });
    };
    resetSwitch();

    cy.get('#gender-selector', { timeout: 60000 }).click();

    cy.get('.MuiList-root')
      .find('li[tabindex="0"]')
      .not(':first')
      .then(($li) => {
        cy.wrap($li).click();
      });

    cy.get('[name="weight"]', { timeout: 60000 })
      .should('be.visible')
      .clear()
      .type(randomNum(100).toString());

    cy.get('[name="height"]', { timeout: 60000 })
      .should('be.visible')
      .clear()
      .type(randomNum(200).toString());

    const switchAndSelectFirstElement = (key: string) => {
      cy.get(`#medical-${key}-switch`).click();
      cy.get(`#medical-${key}`).click();
      cy.get(`#medical-${key}-listbox`)
        .find('li')
        .first()
        .then(($option) => {
          cy.wrap($option).click();
        });
    };

    switchAndSelectFirstElement('breaks');
    switchAndSelectFirstElement('allergies');
    switchAndSelectFirstElement('disease');
    switchAndSelectFirstElement('medicaments');

    cy.get('#medical-smoker-switch').click();
    cy.get('input[name="packsPerDay"]').clear().type(randomNum(20).toString());
    cy.get('input[name="yearsOfSmoking"]').clear().type(randomNum(60).toString());

    cy.get('#medical-alcohol-switch').click();
    cy.get('#medical-alcohol').click();
    cy.get('#medical-alcohol-listbox')
      .find('li[tabindex="-1"]')
      .first()
      .then(($option) => {
        cy.wrap($option).click({ force: true });
      });

    submitForm().wait(3000);
  });
});
