export class PageObject_Home {

  constructor() {

  }

  clickFirstPatient() {
    browser.sleep(500)
    return element.all(by.css('.nav-stacked .nav-link')).first().click();
  }

  getBMITexts() {
    let liEls = element.all(by.css('ul#bmi-list li'));
    return liEls.map(function(elm, index) { return elm.getText(); });
  }
}
