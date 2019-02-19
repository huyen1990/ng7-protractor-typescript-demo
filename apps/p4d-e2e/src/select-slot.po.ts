import { browser, by, element } from 'protractor';

export class SelectSlot {
  navigateTo() {
    return browser.get('https://yyy.pick4d.us' + '/select') as Promise<any>;
  }

  getSelectSlotLinkAriaSelectedValue() {
    return element(by.id('nav-select')).getAttribute(
      'aria-selected'
    ) as Promise<string>;
  }

  getHeadingTitleText() {
    return element(by.id('headingTitle')).getText() as Promise<string>;
  }

  getHeadingSubtitleTextText() {
    return element(by.id('headingSubtitle')).getText() as Promise<string>;
  }

  getFirstTimeSlotText() {
    return element(by.className('timeSlot')).getText() as Promise<string>;
  }

  changeTimeZoneTo(timeZoneId: string = 'tzItem-420') {
    return element(by.id('tzIdClear'))
      .click()
      .then(result => {
        element(by.id(timeZoneId)).click();
      }) as Promise<void>;
  }

  getDateInfoText() {
    return element(by.id('dateInfo')).getText() as Promise<string>;
  }

  clickNext() {
    return element(by.id('next')).click() as Promise<void>;
  }
}
