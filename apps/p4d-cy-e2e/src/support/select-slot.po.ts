// import { browser, by, element } from 'protractor';

export const selectors = {
  dateInfo: '#dateInfo',
  confirmButton: '#call_save',
  confirmLink: '#nav-confirm',
  emailErrorText: '#f_provided_email-error',
  emailInput: '#f_provided_email',
  firstTimeSlot: '.timeSlot',
  h2: 'h2',
  headingSubtitleText: '#headingSubtitle',
  headingTitleText: '#headingTitle',
  manageLink: '#nav-manage',
  nameErrorText: '#f_provided_name-error',
  nameInput: '#f_provided_name',
  nextButton: '#next',
  selectSlotLink: '#nav-select',
  tzIdClearButton: '#tzIdClear',
  tzSearchInput: '#tzSearch'
};

export class SelectSlot {
  get confirmButton() {
    return cy.get(selectors.confirmButton);
  }

  get confirmLinkAriaSelectedValue(): any {
    return cy
      .get(selectors.confirmLink)
      .then(result => result.attr('aria-selected'));
  }

  get emailErrorText() {
    return cy.get(selectors.emailErrorText).then(result => result.text());
  }

  get emailInput(): any {
    return cy.get(selectors.emailInput);
  }

  get timeSlot() {
    return cy.get(selectors.firstTimeSlot);
  }

  get firstTimeSlotText() {
    return this.timeSlot.then(result => result.text());
  }

  get headingTitleText() {
    return cy.get(selectors.headingTitleText).then(result => result.text());
  }

  get headingSubtitleText() {
    return cy.get(selectors.headingSubtitleText).then(result => result.text());
  }

  get nameErrorText() {
    return cy.get(selectors.nameErrorText).then(result => result.text());
  }

  get manageLinkAriaSelectedValue(): any {
    return cy
      .get(selectors.manageLink)
      .then(result => result.attr('aria-selected'));
  }

  get nameInput() {
    return cy.get(selectors.nameInput);
  }

  get selectSlotLinkAriaSelectedValue() {
    return cy
      .get(selectors.selectSlotLink)
      .then(result => result.attr('aria-selected'));
  }

  // via h2
  get h2() {
    return cy.get(selectors.h2);
  }
  get h2Text() {
    return cy.get(selectors.h2).first().then(result => result.text());
  }

  get dateInfoText() {
    return cy.get(selectors.dateInfo).then(result => result.text());
  }

  changeTimeZoneTo(timeZoneText: string) {
    return cy
      .get(selectors.tzIdClearButton)
      .click()
      .then(result => {
        cy.get(selectors.tzSearchInput).type(`${timeZoneText}{enter}`);
      });
  }

  clickNext() {
    return cy.get(selectors.nextButton).click();
  }

  getFakeText(length: number) {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`.substring(
      0,
      length
    );
  }

  navigateTo() {
    // HACK: use baseUrl
    return cy.visit('https://yyy.pick4d.us' + '/select');
  }
}
