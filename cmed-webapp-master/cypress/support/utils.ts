interface WaitInterceptors {
  url: string;
  name: string;
}
export const checkLoading = () => {
  cy.get('#logo').should('be.visible');
};
export const loadPage = (url = '') => {
  const baseUrl = 'http://localhost:3000';
  cy.visit(`${baseUrl}/${url}`);
};

export const loadPageWithInterceptor = (
  url = '',
  interceptors: WaitInterceptors[],
) => {
  const interceptAliases: string[] = [];
  const baseUrl = 'http://localhost:3000';

  interceptors.forEach((interceptor) => {
    cy.intercept(interceptor.url).as(interceptor.name);
    interceptAliases.push(`@${interceptor.name}`);
  });

  cy.visit(`${baseUrl}/${url}`).then(() => {
    cy.wait(interceptAliases, { timeout: 20000 });
  });
};
export const waitInterceptors = (interceptors: WaitInterceptors[]) => {
  const interceptAliases: string[] = [];

  interceptors.forEach((interceptor) => {
    cy.intercept(interceptor.url).as(interceptor.name);
    interceptAliases.push(`@${interceptor.name}`);
  });

  cy.wait(interceptAliases, { timeout: 60000 });
};
export const login = (login = '', password = '') => {
  login && cy.get('input[name="email"]').clear().type(login);
  password && cy.get('input[name="password"]').clear().type(password);
};

export const openSignup = () => {
  cy.contains('Sign In')
    .click()
    .then(() => {
      cy.contains('Sign up').click();
    });
};

export const openSignin = (swap = '') => {
  console.log(`p[(id = '${swap}sign-in')]`);
  cy.get(`p[id="${swap}sign-in"]`, { timeout: 60000 }).should('be.visible').click();
};

export const submitForm = () => cy.get('form').submit();

export const randomNum = (max: number, nums = [0]) => {
  let num;
  do {
    num = Math.floor(Math.random() * max) + 1;
  } while (nums.includes(num));
  return num - 1;
};
export const isSuccess = (successText: string) =>
  cy.get('.Toastify').contains(successText).should('be.visible');
export const saveLocalStorage = (key: string) => cy.wait(1000).saveLocalStorage(key);
export const restoreLocalStorage = (key: string) => cy.restoreLocalStorage(key);

export const loadPageAndAuthorization = (
  url: string,
  credentials: {
    login: string;
    password: string;
  },
) => {
  loadPage();
  openSignin();
  login(credentials.login, credentials.password);
  submitForm().then(() => saveLocalStorage('auth'));
  loadPage(url);
  restoreLocalStorage('auth');
};
