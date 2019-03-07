// import { browser } from 'protractor';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

/**
 * Generic Page Object
 */
export class PageObject {
  private static readonly BROWSER_IE = 'internet explorer';
  private static readonly BROWSER_EDGE = 'MicrosoftEdge';

  /**
   * Crossbrowser Screenshot
   */
  takeSnapshot() {
    cy.screenshot();
    // browser.takeScreenshot();
  }

  /**
   * Create Screenshot in screenshots directory
   * <code>
   *  it('should ...', (done) => {
   *      // ... do something
   *      page.takeSnapshotLocal(done, 'screenshotname');
   *  }
   * </code>
   * @param done function to let protractor wait for screenshot file write completion
   * @param name plain name - .png is added
   */
  takeSnapshotLocal(done: () => void, name?: string) {
    // directory
    const directory = 'e2e/screenshots';
    if (!existsSync(directory)) {
      mkdirSync(directory);
    }
    // file name
    let fileName = 'screenshot.png';
    if (name) {
      fileName = name + '.png';
    }
    const path: string = directory + '/' + fileName;

    console.log('~screenshot', this);
    // https://github.com/juliemr/protractor-demo/blob/master/howtos/screenshot/screenshotReporter.js
    // browser.takeScreenshot().then(png => {
    //   // https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
    //   //
    //   const stream = createWriteStream(path);
    //   stream.write(Buffer.from(png, 'base64'));
    //   stream.end();
    //   console.log('~screenshot=' + path);
    //   if (done) {
    //     done();
    //   }
    // });
  } // takeSnapshotLocal

  /**
   * Get Session Id for test success feedback
   */
  getSessionId() {
    // TODO get session
    // browser.driver.getSession().then(session => {
    //   return session.getId();
    // });
  }

  /**
   * @return true if IE or Edge
   */
  isMicrosoft(): boolean {
    return false;
    // const bn = browser.browserName;
    // return bn === PageObject.BROWSER_IE || bn === PageObject.BROWSER_EDGE;
  }
}
