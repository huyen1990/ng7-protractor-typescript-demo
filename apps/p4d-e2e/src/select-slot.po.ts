import { browser, by, element, protractor } from 'protractor';


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
  next: '#next',
  selectSlotLink: '#nav-select',
  tzIdClear: '#tzIdClear',
  tzSearchInput: '#tzSearch'
};

export class SelectSlot {
  // fields

  // properties
  get h2Text() {
    return element(by.css(selectors.h2)).getText();
  }

  get confirmButton() {
    return element(by.css(selectors.confirmButton));
  }

  get confirmLinkAriaSelectedValue() {
    return element(by.css(selectors.confirmLink)).getAttribute('aria-selected');
  }

  get dateInfoText() {
    return element(by.css(selectors.dateInfo)).getText();
  }

  get emailErrorText() {
    return element(by.css(selectors.emailErrorText)).getText();
  }

  get emailInput() {
    return element(by.css(selectors.emailInput));
  }

  get firstTimeSlot() {
    return element(by.css(selectors.firstTimeSlot));
  }

  get firstTimeSlotText() {
    return this.firstTimeSlot.getText();
  }

  get headingTitleText() {
    return element(by.css(selectors.headingTitleText)).getText();
  }

  get headingSubtitleText() {
    return element(by.css(selectors.headingSubtitleText)).getText();
  }

  get nameErrorText() {
    return element(by.css(selectors.nameErrorText)).getText();
  }

  get manageLinkAriaSelectedValue() {
    return element(by.css(selectors.manageLink)).getAttribute('aria-selected');
  }

  get nameInput() {
    return element(by.css(selectors.nameInput));
  }

  get selectSlotLinkAriaSelectedValue() {
    return element(by.css(selectors.selectSlotLink)).getAttribute(
      'aria-selected'
    );
  }

  // functions/methods
  changeTimeZoneTo(timeZoneText: string) {
    return element(by.css(selectors.tzIdClear))
      .click()
      .then(result => {
        element(by.css(selectors.tzSearchInput)).sendKeys(
          timeZoneText + protractor.Key.ENTER
        );
      }) as Promise<void>;
  }

  clickNext() {
    return element(by.css(selectors.next)).click() as Promise<void>;
  }

  navigateTo() {
    // HACK: use baseUrl
    return browser.get('https://yyy.pick4d.us' + '/select') as Promise<any>;
  }

  getFakeText(length: number) {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`.substring(
      0,
      length
    );
  }
}
