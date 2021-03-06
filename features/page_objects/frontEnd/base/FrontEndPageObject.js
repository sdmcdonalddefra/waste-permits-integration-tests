
const { StaleElementReferenceError } = require('selenium-webdriver').error
const config = require('../../../../config')
const PageObject = require('./../../base/PageObject').PageObject

class FrontEndPageObject extends PageObject {
  get continueButton () { return { css: '#submit-button' } }

  get pageHeading () { return { css: '#page-heading' } }

  get errorMsg () { return { css: '#error-summary-list' } }

  get backLink () { return { css: '#back-link' } }

  get content () { return {css: '#content'}}
  

  /****************************************************************************/

  async waitForPage (title = this.title, timeout = config.timeout) {
    let hasText
     try {
      this.log(`wait for page "${title}"`)
      hasText = await this.hasText(this.pageHeading, title)
    } catch (error) {
      if (!(error instanceof StaleElementReferenceError)) {
        const actualPageHeading = await this.getText(this.pageHeading, timeout)
        if (actualPageHeading === 'Something went wrong') {
          const backlink = await this.backLink
          await this.hasText(backlink, 'Back')
          await this.click(backlink) 
          return this.waitForPage(title)
        }
      }
      if (timeout > 0) {
        await this.sleep(10000)
        hasText = await this.waitForPage(title, timeout - 1000)
      } else {
        throw error
      }
    }
    return Promise.resolve(hasText)
  }

  async selectBackLink () {
    return this.click(this.backLink)
  }

  async checkError (message, timeout = config.timeout) {
    return this.hasLinesOfText(this.errorMsg, message.split(`//`), timeout)
  }

  async checkText (text, timeout = config.timeout) {
    console.log(text)
    return this.hasLinesOfText(this.content, text.split('//'), timeout)
  }

async checkNoText ( text, timeout = config.timeout) {
 return this.hasNoLinesOfText(this.content, text.split('//'), timeout)
}
  
}

module.exports = { FrontEndPageObject }
