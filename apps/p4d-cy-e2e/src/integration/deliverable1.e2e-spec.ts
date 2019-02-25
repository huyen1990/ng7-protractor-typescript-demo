import { SelectSlot } from '../support/select-slot.po';
// import { browser, logging, element, by } from 'protractor';

// declare var require;
// const fs = require('fs');

describe('Select Slot Feature', () => {
  let page: SelectSlot;

  beforeEach(() => {
    // HACK:
    // https://stackoverflow.com/questions/46527912/protractor-scripttimeouterror-asynchronous-script-timeout-result-was-not-rec
    // browser.ignoreSynchronization = true;
    // browser.waitForAngularEnabled(false);
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
    // browser.sleep(5000);

    // - make sure you are on the Select page (via h2) and url /select
    page.h2Text.should('contain', 'Please select a time slot');
    cy.url().should('contain', '/select');
    page.selectSlotLinkAriaSelectedValue.should('eq', 'true');

    // - validate #headingTitle, #headingSubtitle
    cy.wait(2000);
    page.headingTitleText.should('eq', 'Accorto Call');
    page.headingSubtitleText.should('eq', 'Pick a good time for you');

    // -- ultimately the values will differ based on url

    // - get the first .timeSlot - get the id and remember the text in the time element
    page.firstTimeSlotText.then(timeElementText => {
      console.log('timeElementText:', timeElementText);

      // - change the timezone to Europe/Moscow
      page.changeTimeZoneTo('Europe/Moscow').then(() => {
        // - get the first .timeSlot by id and make sure the text in the time element is different
        page.firstTimeSlotText.should('not.eq', timeElementText);
      });
    });

    // - remember the text of #dateInfo
    page.dateInfoText.then(dateInfoText => {
      console.log('dateInfoText:', dateInfoText);

      // - click on #next twice
      page.clickNext();
      page.clickNext();

      // - compare the #dateInfo - should be different
      page.dateInfoText.should('not.eq', dateInfoText);
    });

    // - (create a screenshot)
    cy.screenshot('./apps/p4d-cy-e2e/screenshots/test-case-001.png');

    // - click on the first .timeSlot
    // browser.sleep(4000);
    page.timeSlot.first().click();

    // - make sure that you are on the Confirm page via h2 and url /confirm/...
    page.h2Text.should('contain', 'Please Confirm');
    cy.url().should('contain', '/confirm');
    page.confirmLinkAriaSelectedValue.should('eq', 'true');

    // - make sure that you cannot click confirm (should be ready then)
    page.confirmButton.should('not.be.enabled');

    page.emailInput.type('user@test.');
    page.confirmButton.should('not.be.enabled');

    page.emailErrorText.should('contains', 'Your Email: invalid email');

    // check more than 61 characters
    page.nameInput.type(
      '1234567890123456789012345678901234567890123456789012345678901'
    );
    page.confirmButton.should('not.be.enabled');

    page.nameErrorText.should(
      'contain',
      'Your Name: requiredLength: 60 actualLength: 61'
    );

    // - filling in form (should be ready then) and clicking confirm
    page.emailInput.type('com');
    page.nameInput.clear();
    page.nameInput.type('John Doe');
    page.confirmButton.should('be.enabled');

    page.confirmButton.click();

    // browser.sleep(2000);

    cy.url().should('contain', '/manage');
    page.manageLinkAriaSelectedValue.should('eq', 'true');

    // browser.sleep(2000);

    // Note:
    // - all elements should have id's or unique h1/h2/.., no need to do complex by... or so -- if not, we'll create it

    // Deliverable #2
    // - we want to create screenshots but comparing them is far too complex due to the dynamic nature
    // - crossbrowsertesting - screenshot - using Selenium Script - after pressing next twice
    // - the Selenium script should be stand alone
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    // const logs = await browser
    //   .manage()
    //   .logs()
    //   .get(logging.Type.BROWSER);
    // expect(logs).not.toContain(
    //   jasmine.objectContaining({
    //     level: logging.Level.SEVERE
    //   })
    // );
  });
});

// function writeScreenShot(data, filename) {
//   const stream = fs.createWriteStream(filename);
//   stream.write(new Buffer(data, 'base64'));
//   stream.end();
// }
