export class PageObject_About {

  constructor() {}

  getContent() {
    return element(by.css('router-view.au-target')).getText();
  }
}
