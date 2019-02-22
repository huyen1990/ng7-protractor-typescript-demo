// import { browser, by, element } from 'protractor';

export const getGreeting = () => cy.get('h1');

// export class SelectSlot {
export const navigateTo = () => cy.visit('https://yyy.pick4d.us' + '/select');

export const getSlectSlotLink = cy.get('#nav-select');

export const getSelectSlotLinkAriaSelectedValue = () =>
  cy.get('#nav-select').then(selectSlotLinkElement => {
    selectSlotLinkElement.attr('aria-selected');
  });

export const getHeadingTitle = cy.get('#headingTitle');
export const getHeadingTitleText = getHeadingTitle.then(el => el.text());

export const getHeadingSubtitle = cy.get('#getHeadingSubtitleText');
export const getHeadingSubtitleText = getHeadingSubtitle.then(el => el.text());

export const getFirstTimeSlot = cy.get('.timeSlot');
export const getFirstTimeSlotText = getFirstTimeSlot.then(el => el.text());

export const getTimeZoneClearButton = cy.get('#tzIdClear');
export const changeTimeZoneTo = (timeZoneId: string = 'tzItem-420') => {
  return getTimeZoneClearButton.click().then(() => 
    cy.get(`#${timeZoneId}`).click()
  );
};

// export const changeTimeZoneTo(timeZoneId: string = 'tzItem-420') {
//   return element(by.id('tzIdClear'))
//     .click()
//     .then(result => {
//       element(by.id(timeZoneId)).click();
//     }) as Promise<void>;
// }

export const getDateInfo = cy.get('#dateInfo');
export const getDateInfoText = getDateInfo.then(el => el.text());

export const getNextButton = cy.get('#next');
export const clickNext = () => getNextButton.click();
