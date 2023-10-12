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
    url: 'https://dev-api.clickmedicus.com/api/v1/language',
    name: 'Languages',
  },
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/country',
    name: 'Specialities',
  },
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/state',
    name: 'State',
  },
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/city',
    name: 'City',
  },
];
const accountInterceptor = [
  {
    url: 'https://dev-api.clickmedicus.com/api/v1/account',
    name: 'Account',
  },
];
describe('Test as personal info', () => {
  const name = () => Math.random().toString().substring(1, 6);

  it('Log in to work with a profile', () => {
    const email = 'qa-test@clickmedicus.com';
    const password = 'qatest123';

    loadPage();

    openSignin();

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    submitForm().then(() => {
      saveLocalStorage('auth');
    });
  });

  it('Testing setting avatar', () => {
    restoreLocalStorage('auth');
    loadPage('profile?tab=personal-information');
    cy.get('#avatar-file', { timeout: 60000 })
      .selectFile('cypress/fixtures/avatar.jpg', {
        force: true,
      })
      .wait(1000);

    // cy.get('img[alt="avatar"]', { timeout: 60000 });
  });

  it('Testing delete avatar', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', accountInterceptor);

    cy.get('#delete-avatar').click();

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Testing if firstName change works', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[name="firstName"]').should('be.visible').clear().type(name());

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Testing if lastName change works', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[name="lastName"]').should('be.visible').clear().type(name());

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Change birthDate', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[id="list-days"]').should('be.visible').click();
    cy.get('ul[id="list-days-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get('li[id^="list-days-option-"]').eq(randomNum(length)).click();
      });

    cy.get('input[id="list-months"]').click();
    cy.get('ul[id="list-months-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get('li[id^="list-months-option-"]').eq(randomNum(length)).click();
      });

    cy.get('input[id="list-years"]').click();
    cy.get('ul[id="list-years-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get('li[id^="list-years-option-"]').eq(randomNum(length)).click();
      });

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Testing if country change works', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[id="list-countries"]').should('be.visible').click();
    cy.get('ul[id="list-countries-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get('li[id^="list-countries-option-"]').eq(randomNum(length)).click();
      });

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Change city', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[id="list-cities"]').should('be.visible').click();
    cy.get('ul[id="list-cities-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get(`li[id="list-cities-option-${randomNum(length)}"]`).click();
      });

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Change states', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[id="list-states"]').should('be.visible').click();
    cy.get('ul[id="list-states-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get(`li[id="list-states-option-${randomNum(length)}"]`).click();
      });

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Change address', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[name="address"]').should('be.visible').clear().type(name());

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Adding language', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[id="language-list"]').should('be.visible').click();
    cy.get('ul[id="language-list-listbox"]')
      .find('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((length) => {
        cy.get(`li[id="language-list-option-${randomNum(length)}"]`).click();
      });

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });

  it('Testing if delete language works', () => {
    restoreLocalStorage('auth');
    loadPageWithInterceptor('profile?tab=personal-information', interceptors);

    cy.get('input[id="language-list"]').should('be.visible').click();

    // cy.get(
    //   'div[aria-owns="language-list-listbox"] .MuiFormControl-root .MuiInputBase-root div[data-tag-index="0"] svg',
    // ).click();

    submitForm().then(() => {
      isSuccess('Your personal information has been successfully updated.');
    });
  });
});
