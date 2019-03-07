// import { browser, by, element, protractor } from 'protractor';
import { PageObject } from './page-object';

export const selectors = {
  dateInfo: '#dateInfo',
  confirmButton: '#call_save',
  confirmLink: '#nav-confirm',
  emailErrorText: '#f_provided_email-error',
  emailInput: '#f_provided_email',
  firstTimeSlot: '.timeSlot :first-of-type',
  h2: 'h2',
  headingSubtitleText: '#headingSubtitle',
  headingTitleText: '#headingTitle',
  manageLink: '#nav-manage',
  nameErrorText: '#f_provided_name-error',
  nameInput: '#f_provided_name',
  next: '#next',
  selectSlotLink: '#nav-select',
  tzIdClear: '#tzIdClear',
  tzSearchInput: '#tzSearch'
};

/**
 * Pick4D Page object
 */
export class AppPage extends PageObject {
  // properties
  get firstH2Text() {
    return cy
      .get(selectors.h2)
      .first()
      .then(result => result.text());
  }

  get confirmButton() {
    return cy.get(selectors.confirmButton);
  }

  get confirmLinkAriaSelectedValue() {
    return cy
      .get(selectors.confirmLink)
      .then(result => result.attr('aria-selected'));
  }

  get dateInfoText() {
    return cy.get(selectors.dateInfo).then(result => result.text());
  }

  get emailErrorText() {
    return cy.get(selectors.emailErrorText).then(result => result.text());
  }

  get emailInput() {
    return cy.get(selectors.emailInput);
  }

  get firstTimeSlot() {
    return cy.get(selectors.firstTimeSlot).first();
  }

  get firstTimeSlotText() {
    return this.firstTimeSlot.then(result => result.text());
  }

  get headingTitle() {
    return cy.get(selectors.headingTitleText);
  }

  get headingTitleText() {
    return this.headingTitle.then(result => result.text());
  }

  get headingSubtitleText() {
    return cy.get(selectors.headingSubtitleText).then(result => result.text());
  }

  get nameErrorText() {
    return cy.get(selectors.nameErrorText).then(result => result.text());
  }

  get manageLinkAriaSelectedValue() {
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

  // functions/methods
  changeTimeZoneTo(timeZoneText: string) {
    return cy
      .get(selectors.tzIdClear)
      .click()
      .then(result => {
        cy.get(selectors.tzSearchInput).type(timeZoneText + '{enter}');
      });
  }

  clickNext() {
    return cy.get(selectors.next).click();
  }

  navigateTo() {
    // HACK: use baseUrl should forward to /select
    return cy.visit('https://yyy.pick4d.us');
  }
} // AppPage
