const config = require('../../../../config')
const PageObject = require('./../../base/PageObject').PageObject

class FrontEndPageObject extends PageObject {
  get continueButton () { return { css: '#submit-button' } }

  get pageHeading () { return { css: '#page-heading' } }

  get pageHeadingGovUK () { return { className: 'govuk-heading-l' } }

  get errorMsg () { return { css: '#error-summary-list' } }

  get backLink () { return { id: 'back-link' } }

  /****************************************************************************/

  async waitForPage (title = this.title, timeout = config.timeout) {
    let hasText
    try {
      this.log(`wait for page "${title}"`)
      hasText = await this.hasText(this.pageHeading, title)
    } catch (e) {
      if (timeout > 0) {
        await this.sleep(1000)
        hasText = await this.waitForPage(title, timeout - 1000)
      } else {
        throw e
      }
    }
    return Promise.resolve(hasText)
  }

  async waitForGovUKPage (title = this.title, timeout = config.timeout) {
    // this.log('HEADING' + this.pageHeadingGovUK.getText())
    return this.hasText(this.pageHeadingGovUK, title)
  }

  async checkError (message, timeout = config.timeout) {
    return this.hasLinesOfText(this.errorMsg, message.split(`//`), timeout)
  }
}

module.exports = { FrontEndPageObject }
