import { SelectSlot } from './select-slot.po';
import { browser, logging } from 'protractor';

declare var require;
const fs = require('fs');
const rootE2ePath = './apps/p4d-e2e';

describe('Select Slot Feature', () => {
  let page: SelectSlot;

  beforeEach(() => {
    // HACK:
    // https://stackoverflow.com/questions/46527912/protractor-scripttimeouterror-asynchronous-script-timeout-result-was-not-rec
    // browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
    page = new SelectSlot();
  });

  it('should work for deliverable #1 smoke test', () => {
    //   We want to use ng e2e (protractor) to automate the test of our Angular (7) application.
    // The application under development is available at https://yyy.pick4d.us.

    // Deliverable #1:
    // - Standalone Angular 7 e2e project (typescript)
    // -- using local chrome -and/or-
    // -- using crossbrowsertesting.com (login will be provided)
    // - (i.e. run against url from Gitlab ci pipeline or any box with node)
    // - ultimately, https://yyy.pick4d.us will be different from https://zzz.pick4d.us - at the moment the same)

    // Initial Test script:
    // - go to url
    page.navigateTo();

    // HACK:
    browser.sleep(5000);

    // - make sure you are on the Select page (via h2) and url /select
    expect(page.h2Text).toEqual('Please select a time slot');
    expect(browser.getCurrentUrl()).toContain('/select');
    expect(page.selectSlotLinkAriaSelectedValue).toEqual('true');

    // - validate #headingTitle, #headingSubtitle
    expect(page.headingTitleText).toEqual('Accorto Call');
    expect(page.headingSubtitleText).toEqual('Pick a good time for you');

    // -- ultimately the values will differ based on url

    // - get the first .timeSlot - get the id and remember the text in the time element
    page.firstTimeSlotText.then(timeElementText => {
      console.log('timeElementText:', timeElementText);

      // - change the timezone to Europe/Moscow
      page.changeTimeZoneTo('Europe/Moscow').then(() => {
        // - get the first .timeSlot by id and make sure the text in the time element is different
        expect(page.firstTimeSlotText).not.toEqual(timeElementText);
      });
    });

    // - remember the text of #dateInfo
    page.dateInfoText.then(dateInfoText => {
      console.log('dateInfoText:', dateInfoText);

      // - click on #next twice
      page.clickNext();
      page.clickNext();

      // - compare the #dateInfo - should be different
      expect(page.dateInfoText).not.toEqual(dateInfoText);
    });

    // - (create a screenshot)
    browser.takeScreenshot().then(png => {
      writeScreenShot(png, rootE2ePath + '/screenshots/test-case-001.png');
    });

    // - click on the first .timeSlot
    browser.sleep(4000);
    page.firstTimeSlot.click();

    // - make sure that you are on the Confirm page via h2 and url /confirm/...
    expect(page.h2Text).toEqual('Please Confirm');
    expect(browser.getCurrentUrl()).toContain('/confirm');
    expect(page.confirmLinkAriaSelectedValue).toEqual('true');

    // - make sure that you cannot click confirm (should be ready then)
    expect(page.confirmButton.isEnabled()).toBeFalsy();

    page.emailInput.sendKeys('user@test.');
    expect(page.confirmButton.isEnabled()).toBeFalsy();

    expect(page.emailErrorText).toEqual('Your Email: invalid email');

    // check more than 61 characters
    page.nameInput.sendKeys(
      '1234567890123456789012345678901234567890123456789012345678901'
    );
    expect(page.confirmButton.isEnabled()).toBeFalsy();

    expect(page.nameErrorText).toEqual(
      'Your Name: requiredLength: 60 actualLength: 61'
    );

    // - filling in form (should be ready then) and clicking confirm
    page.emailInput.sendKeys('com');
    page.nameInput.clear();
    page.nameInput.sendKeys('John Doe');
    expect(page.confirmButton.isEnabled()).toBeTruthy();

    page.confirmButton.click();

    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toContain('/manage');
    expect(page.manageLinkAriaSelectedValue).toEqual('true');

    browser.sleep(1000);

    // Note:
    // - all elements should have id's or unique h1/h2/.., no need to do complex by... or so -- if not, we'll create it

    // Deliverable #2
    // - we want to create screenshots but comparing them is far too complex due to the dynamic nature
    // - crossbrowsertesting - screenshot - using Selenium Script - after pressing next twice
    // - the Selenium script should be stand alone
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      })
    );
  });
});

function writeScreenShot(data, filename) {
  const stream = fs.createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
}
