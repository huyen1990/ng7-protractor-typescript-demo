// import { SelectSlot } from '../support/select-slot.po';
import * as page from '../support/select-slot.po';
// import { browser, logging, element, by } from 'protractor';
// const fs = require('fs');

describe('Select Slot Feature', () => {
  // let page: SelectSlot;

  beforeEach(
    () => cy.visit('https://yyy.pick4d.us' + '/select')

    // https://stackoverflow.com/questions/46527912/protractor-scripttimeouterror-asynchronous-script-timeout-result-was-not-rec
    // browser.waitForAngularEnabled(false);
    // browser.ignoreSynchronization = true;
    // page = new SelectSlot();
  );

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
    // page.navigateTo();

    // browser.wait(element(by.id('week')).getWebElement(), 5000);
    // HACK:
    // browser.sleep(4000);

    // // - make sure you are on the Select page (via h2) and url /select
    // expect(page.getSelectSlotLinkAriaSelectedValue()).eq('true');
    cy.url().should('contain', '/select');
    cy.get('#nav-select').should('have.attr', 'aria-selected', 'true');
    cy.get('h2').should('contain', 'Please select a time slot');

    // // - validate #headingTitle, #headingSubtitle
    // expect(page.getHeadingTitleText).eq('Accorto Call');
    cy.get('#headingTitle').contains('Accorto Call');
    // expect(page.getHeadingSubtitleText).eq(
    //   'Pick a good time for you'
    // );
    cy.get('#headingSubtitle').contains('Pick a good time for you');

    // // -- ultimately the values will differ based on url
    // // - get the first .timeSlot - get the id and remember the text in the time element
    // page.getFirstTimeSlotText.then(timeElementText => {
    cy.get('.timeSlot').then(timeElementText => {
      //   console.log('timeElementText:', timeElementText);
      console.log('timeElementText', timeElementText.text());
      //   // - change the timezone to Europe/Moscow
      //   page.changeTimeZoneTo().then(() => {
      cy.get('#tzIdClear').click();
      // cy.get('.timeSlot').select('tzItem-420');
      cy.get('#tzItem-420').click();
      //     // - get the first .timeSlot by id and make sure the text in the time element is different
      //     expect(page.getFirstTimeSlotText).not.eq(timeElementText);
      cy.get('.timeSlot').should('not.have.text', timeElementText.text());
      //   });
      // });
    });

    // // - remember the text of #dateInfo
    // page.getDateInfoText.then(dateInfoText => {
    cy.get('#dateInfo').then(dateInfoElement => {
      //   console.log('dateInfoText:', dateInfoText);
      const dateInfoText1 = dateInfoElement.text();
      //   // - click on #next twice
      //   page.clickNext();
      //   page.clickNext();
      cy.get('#next').click();
      cy.get('#next').click();

      //   // - compare the #dateInfo - should be different
      //   expect(page.getDateInfoText).not.eq(dateInfoText);
      cy.get('#dateInfo').should('not.have.text', dateInfoText1);
    });
    // });

    // // - (create a screenshot)
    // // browser.takeScreenshot().then((png) => {
    // // writeScreenShot(png, './apps/p4d-e2e/screenshots/test-case-001.png');
    // // });
    // cy.screenshot(`./apps/p4d-cy-e2e/screenshots/test-case-001.png`);
    // cy.screenshot(`test-case-002`);

    // // - click on the first .timeSlot
    cy.get('.timeSlot').first().click();
    // // - make sure that you are on the Confirm page via h2 and url /confirm/...
    cy.url().should('contain', '/confirm');
    cy.get('#nav-confirm').should('have.attr', 'aria-selected', 'true');
    cy.get('h2').should('contain', 'Please Confirm');

    // // - make sure that you cannot click confirm (should be ready then)
    cy.get('#_save').should('be.disabled');
    cy.get(`[name='providedEmail']`).type('huyen@kj.');
    cy.contains('Your Email: invalid email');
    cy.get('#_save').should('be.disabled');

    // // - filling in form (should be ready then) and clicking confirm
    cy.get(`[name='providedEmail']`).type('com');
    cy.get('#_save').should('be.enabled');

    cy.get('#_save').click();


    // // Note:
    // // - all elements should have id's or unique h1/h2/.., no need to do complex by... or so -- if not, we'll create it

    // // Deliverable #2
    // // - we want to create screenshots but comparing them is far too complex due to the dynamic nature
    // // - crossbrowsertesting - screenshot - using Selenium Script - after pressing next twice
    // // - the Selenium script should be stand alone
  });

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser
  //     .manage()
  //     .logs()
  //     .get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(
  //     jasmine.objectContaining({
  //       level: logging.Level.SEVERE
  //     })
  //   );
  // });
});

// function writeScreenShot(data, filename) {
//   const stream = fs.createWriteStream(filename);
//   stream.write(new Buffer(data, 'base64'));
//   stream.end();
// }
