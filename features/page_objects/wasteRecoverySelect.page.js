const PageObject = require('./base/PageObject').PageObject

class WasteRecoverySelectPage extends PageObject {
  get title () { return 'You need to upload your waste recovery plan' }

  choice (choice) {
    const id = `selection-${choice.replace(/\s+/g, '-').toLowerCase()}-input`
    return {css: `#${id}`}
  }

  async completePage (choice) {
    await this.waitForPage()
    await this.click(this.choice(choice))
    return this.click(this.continueButton)
  }
}

module.exports = WasteRecoverySelectPage
