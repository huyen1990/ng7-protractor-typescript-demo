import { AppPage } from '../support/app.po';
// import { browser, logging, protractor } from 'protractor';

declare var require;
const fs = require('fs');
const rootE2ePath = './e2e';
// const EC = protractor.ExpectedConditions;

/*

Feedback:
- you write Typescript as Javascript not using much of the typescript functionality
-- e.g. function writeScreenShot (which should be in the page object anyway
-- used my old takeScreenshot method

Open Items:

- remove sleeps
-- please check protractor await and protractor.ExpectedConditions


- remove Selenium warnings
W/element - more than one element found for locator By(css selector, .timeSlot) - the first result will be used
-- is there a "get first" selector?

- feedback success/failure
https://help.crossbrowsertesting.com/selenium-testing/tutorials/updating-selenium-tests-pass-fail/

 */

describe('test-pick4d', () => {
  let page: AppPage;
  let sessionId: string;

  beforeEach(() => {
    // HACK:
    // https://stackoverflow.com/questions/46527912/protractor-scripttimeouterror-asynchronous-script-timeout-result-was-not-rec
    // browser.waitForAngularEnabled(false);
    // browser.ignoreSynchronization = true; // TODO: might be useful?
    page = new AppPage();
  });

  describe('basic flow', () => {
    it('should open /select', () => {
      // go to /
      page.navigateTo();

      // HACK: wait // browser.sleep(5000);
      // browser.wait(
      //   EC.textToBePresentInElement(page.headingTitle, 'Accorto Call')
      // );
      // page.headingTitleText.should('eq', 'Accorto Call');
      page.headingTitle.contains('Accorto Call');

      // - make sure you are on the Select page (via h2) and url /select
      // expect(page.firstH2Text).to.equal('Please select a time slot');
      // expect(browser.getCurrentUrl()).toContain('/select');
      // expect(page.selectSlotLinkAriaSelectedValue).toEqual('true');
      page.firstH2Text.should('contain', 'Please select a time slot');
      cy.url().should('contain', '/select');
      page.selectSlotLinkAriaSelectedValue.should('eq', 'true');

      // // - validate #headingTitle, #headingSubtitle
      // expect(page.headingTitleText).toEqual('Accorto Call');
      // expect(page.headingSubtitleText).toEqual('Pick a good time for you');
      page.headingTitleText.should('eq', 'Accorto Call');
      page.headingSubtitleText.should('eq', 'Pick a good time for you');
      // //
      // page.takeSnapshot();
    });

    // it('should get session id', () => {
    //   // TODO: hardcoded
    //   this.sessionId = page.getSessionId();
    // });

    it('should switch timezone', () => {
      // HACK: wait
      // browser.wait(EC.presenceOf(page.firstTimeSlot));
      // cy.wait(2000); // needs to update from Pick 4D

      // - get the first .timeSlot - get the id and remember the text in the time element
      page.firstTimeSlotText.then(timeElementText => {
        console.log('timeElementText:', timeElementText);

        // - change the timezone to Europe/Moscow
        page.changeTimeZoneTo('Europe/Moscow').then(() => {
          //   // - get the first .timeSlot by id and make sure the text in the time element is different
          //   // expect(page.firstTimeSlotText).not.toEqual(timeElementText);
          page.firstTimeSlotText.should('not.equal', timeElementText);
        });
      });
      //
      // page.takeSnapshot();
      // page.takeSnapshotLocal(done, 'selectTzSwitch');
    });

    it('should go forward two weeks', () => {
      // - remember the text of #dateInfo
      page.takeSnapshot();
      page.dateInfoText.then(dateInfoText => {
        console.log('dateInfoText:', dateInfoText);

        // - click on #next twice
        page.clickNext();
        page.clickNext();
        page.takeSnapshot();

        // - compare the #dateInfo - should be different
        // expect(page.dateInfoText).not.toEqual(dateInfoText);
        page.dateInfoText.should('not.equal', dateInfoText);
      });

      // page.takeSnapshotLocal(done, 'selectInTwoWeeks');
    });

    it('should select first timeslot opening /confirm', () => {
      // - click on the first .timeSlot
      // browser.wait(
      //   EC.elementToBeClickable(page.firstTimeSlot)
      // );
      page.firstTimeSlot.click();

      //   // - make sure that you are on the Confirm page via h2 and url /confirm/...
      //   expect(page.firstH2Text).toEqual('Please Confirm');
      //   expect(browser.getCurrentUrl()).toContain('/confirm');
      //   expect(page.confirmLinkAriaSelectedValue).toEqual('true');
      page.firstH2Text.should('contain', 'Please Confirm');
      cy.url().should('contain', '/confirm');
      page.confirmLinkAriaSelectedValue.should('eq', 'true');

      //   // - make sure that you cannot click confirm (should be ready then)
      //   expect(page.confirmButton.isEnabled()).toBeFalsy();
      page.confirmButton.should('not.be.enabled');

      //   page.takeSnapshot();
      //   page.takeSnapshotLocal(done, 'confirmInitial');
    });

    it('should confirm', () => {
      page.emailInput.type('user@test.');
      // expect(page.confirmButton.isEnabled()).toBeFalsy();
      page.confirmButton.should('not.be.enabled');

      // expect(page.emailErrorText).toEqual('Your Email: invalid email');
      page.emailErrorText.should('contains', 'Your Email: invalid email');

      // check more than 61 characters
      page.nameInput.type(
        '1234567890123456789012345678901234567890123456789012345678901'
      );
      // expect(page.confirmButton.isEnabled()).toBeFalsy();
      page.confirmButton.should('not.be.enabled');

      // expect(page.nameErrorText).toEqual(
      //   'Your Name: requiredLength: 60 actualLength: 61'
      // );
      page.nameErrorText.should(
        'contain',
        'Your Name: requiredLength: 60 actualLength: 61'
      );

      // - filling in form (should be ready then) and clicking confirm
      page.emailInput.type('com');
      page.nameInput.clear();
      page.nameInput.type('John Doe');
      // expect(page.confirmButton.isEnabled()).toBeTruthy();
      page.confirmButton.should('be.enabled');

      page.confirmButton.click();

      // browser.wait(EC.urlContains('/manage'));
      // expect(page.manageLinkAriaSelectedValue).toEqual('true');
      cy.url().should('contain', '/manage');
      page.manageLinkAriaSelectedValue.should('eq', 'true');

      // page.takeSnapshot();

      // - to view end of testing
      // browser.sleep(2000);
    });
  }); // describe

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    // const logs = await browser
    //   .manage()
    //   .logs()
    //   .get(logging.Type.BROWSER);
    // expect(logs).not.toContain(
    //   jasmine.objectContaining({
    //     level: logging.Level.WARNING
    //   })
    // );
    // TODO if running in crossbrowser, mark test success/failure
    // I think the structure if the sessionId you get from crossbrowser is different from local
    // https://help.crossbrowsertesting.com/selenium-testing/tutorials/updating-selenium-tests-pass-fail/
  });
});
