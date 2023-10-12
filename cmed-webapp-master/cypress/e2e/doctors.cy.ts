import {
  checkLoading,
  loadPage,
  login,
  openSignin,
  randomNum,
  restoreLocalStorage,
  saveLocalStorage,
  submitForm,
  waitInterceptors,
} from '../support/utils';

export {};
const doctorInterceptor = [
  { name: 'Doctors', url: 'https://dev-api.clickmedicus.com/api/v1/doctors' },
];
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

// const toggleFavoriteDoctor = (department: number, remove?: boolean) => {
//   restoreLocalStorage('auth');

//   loadPage('doctors/departments/urology');

//   waitInterceptors(doctorInterceptor);

//   cy.intercept(
//     remove
//       ? 'https://dev-api.clickmedicus.com/api/v1/favorite-doctors/add'
//       : 'https://dev-api.clickmedicus.com/api/v1/favorite-doctors/remove/*',
//   ).as(remove ? 'addFavorite' : 'removeFavorite');
//   console.log('================================' + remove);

//   cy.get('#doctor-container', { timeout: 60000 })
//     .should('be.visible')
//     .children()
//     .get('#favorite-doctor')
//     .first()
//     .wait(2000)
//     .click()
//     .then(() => {
//       console.log('================================' + remove);
//       cy.wait(remove ? '@addFavorite' : '@removeFavorite', { timeout: 60000 }).wait(
//         2000,
//       );
//     });
// };

describe('Doctor Departments', () => {
  const selectedDepartment = randomNum(12);

  it('Applying filters', () => {
    loadPage('doctors/departments');

    cy.get('#departments-list').then(() => {
      cy.get('#department-option-3').click().should('be.visible');
    });

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
    const email = 'qa-test@clickmedicus.com';
    const password = 'qatest123';

    loadPage('doctors/departments/urology');
    openSignin();
    login(email, password);
    submitForm().then(() => saveLocalStorage('auth'));

    cy.then(() => {
      checkLoading();
      cy.get('.MuiBadge-root').click();
    });
  });

  it('Saving favorite doctor', () => {
    restoreLocalStorage('auth');

    loadPage('doctors/departments/urology');

    waitInterceptors(doctorInterceptor);

    cy.intercept('https://dev-api.clickmedicus.com/api/v1/favorite-doctors/add').as(
      'addFavorite',
    );

    cy.get('#doctor-container', { timeout: 60000 })
      .should('be.visible')
      .children()
      .get('#favorite-doctor')
      .first()
      .wait(2000)
      .click()
      .then(() => {
        cy.wait('@addFavorite', {
          timeout: 60000,
        }).wait(2000);
      });
  });

  it('Removing favorite doctor', () => {
    restoreLocalStorage('auth');

    loadPage('doctors/departments/urology');

    waitInterceptors(doctorInterceptor);

    cy.intercept(
      'https://dev-api.clickmedicus.com/api/v1/favorite-doctors/remove/*',
    ).as('removeFavorite');
    cy.get('#doctor-container', { timeout: 60000 })
      .should('be.visible')
      .children()
      .get('#favorite-doctor')
      .first()
      .wait(2000)
      .click()
      .then(() => {
        cy.wait('@removeFavorite', {
          timeout: 60000,
        }).wait(2000);
      });
  });
  it('Book a doctors appointment', () => {
    restoreLocalStorage('auth');
    loadPage('doctors/departments/urology');

    cy.get('#doctor-container', { timeout: 60000 })
      .should('be.visible')
      .find('button:not([disabled])')
      .first()
      .click();

    const clickFirstEnabledButton = () => {
      cy.get('.MuiCalendarPicker-root', { timeout: 60000 })
        .should('be.visible')
        .find('#available-slots-day')
        .each(($day) => {
          cy.wrap($day)
            .find('button')
            .should('be.visible')
            .then(($buttons) => {
              const $enabledButton = $buttons.filter(':not([disabled])').first();
              if ($enabledButton.length > 0) {
                cy.wrap($enabledButton).click();
              } else {
                cy.get('button[title="Next month"]').click();
                clickFirstEnabledButton();
              }
            });
        });
    };

    clickFirstEnabledButton();

    cy.get('#available-slots', { timeout: 60000 })
      .first()
      .find('button')
      .click({ multiple: true });
  });
});
