import { browser, by, element } from 'protractor';

export const selectors = {
  dateInfo: '#dateInfo',
  confirmButton: '#call_save',
  confirmLink: '#nav-confirm',
  emailErrorText: '#f_provided_email-error',
  emailInput: '#f_provided_email',
  firstTimeSlot: '.timeSlot',
  h2: 'h2',
  headingSubtitleTextText: '#headingSubtitle',
  headingTitleText: '#headingTitle',
  manageLink: '#nav-manage',
  nameErrorText: '#f_provided_name-error',
  nameInput: '#f_provided_name',
  next: '#next',
  selectSlotLink: '#nav-select',
  tzIdClear: '#tzIdClear'
};

export class SelectSlot {
  changeTimeZoneTo(timeZoneId: string = 'tzItem-420') {
    return element(by.css(selectors.tzIdClear))
      .click()
      .then(result => {
        element(by.id(timeZoneId)).click();
      }) as Promise<void>;
  }

  clickNext() {
    return element(by.css(selectors.next)).click() as Promise<void>;
  }

  getConfirmButton() {
    return element(by.css(selectors.confirmButton));
  }

  getConfirmLinkAriaSelectedValue(): any {
    return element(by.css(selectors.confirmLink)).getAttribute(
      'aria-selected'
    ) as Promise<string>;
  }

  getEmailErrorText() {
    return element(by.css(selectors.emailErrorText)).getText() as Promise<
      string
    >;
  }

  getEmailInput(): any {
    return element(by.css(selectors.emailInput));
  }

  getFirstTimeSlot() {
    return element(by.css(selectors.firstTimeSlot));
  }

  getFirstTimeSlotText() {
    return this.getFirstTimeSlot().getText() as Promise<string>;
  }

  getHeadingTitleText() {
    return element(by.css(selectors.headingTitleText)).getText() as Promise<
      string
    >;
  }

  getHeadingSubtitleTextText() {
    return element(
      by.css(selectors.headingSubtitleTextText)
    ).getText() as Promise<string>;
  }

  getNameErrorText() {
    return element(by.css(selectors.nameErrorText)).getText() as Promise<
      string
    >;
  }

  getManageLinkAriaSelectedValue(): any {
    return element(by.css(selectors.manageLink)).getAttribute(
      'aria-selected'
    ) as Promise<string>;
  }

  getNameInput() {
    return element(by.css(selectors.nameInput));
  }

  getSelectSlotLinkAriaSelectedValue() {
    return element(by.css(selectors.selectSlotLink)).getAttribute(
      'aria-selected'
    ) as Promise<string>;
  }

  //via h2
  getH2Text() {
    return element(by.css(selectors.h2)).getText() as Promise<string>;
  }

  navigateTo() {
    // HACK: use baseUrl
    return browser.get('https://yyy.pick4d.us' + '/select') as Promise<any>;
  }

  getDateInfoText() {
    return element(by.css(selectors.dateInfo)).getText() as Promise<string>;
  }

  getFakeText(length: number) {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`.substring(
      0,
      length
    );
  }
}
