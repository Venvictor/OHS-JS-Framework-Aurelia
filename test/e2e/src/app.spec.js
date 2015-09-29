import {PageObject_App} from './app.po.js';
import {PageObject_Home} from './home.po.js';
import {PageObject_About} from './about.po.js';

describe('OHS BakeOff', function() {
  var po_app,
      po_home,
      po_about;

  beforeEach( () => {
    po_app = new PageObject_App();
    po_home = new PageObject_Home();
    po_about = new PageObject_About();

    browser.loadAndWaitForAureliaPage("http://localhost:9000");
  });

  it('should load the page and display the initial page title', () => {
    expect(po_app.getCurrentPageTitle()).toBe('Home | OHS Bakeoff');
  });

  it('should navigate to about page', () => {
    po_app.navigateTo('#/about');
    expect(po_app.getCurrentPageTitle()).toBe('About | OHS Bakeoff');
    expect(po_about.getContent()).toMatch(/This is a test by Open Health Service \(K693\) to evaluate various javascript frameworks\. All patient data is synthetic\./)
  });

  it('should navigate back home', () => {
    po_app.navigateTo('#/about');
    po_app.navigateTo('#/');
    expect(po_app.getCurrentPageTitle()).toBe('Home | OHS Bakeoff');
  });

  it('should initially show no BMI information', () => {
    po_home.getBMITexts().then(bmis =>{
      expect(bmis.length).toBe(0);
    })
  });

  it('clicking a patient should show BMI information', () => {
    po_home.clickFirstPatient();
    po_home.getBMITexts().then(bmis => {
      expect(bmis.length).toBeGreaterThan(0);
      for (let bmi of bmis) {
        expect(bmi).toMatch(/\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2} [ap]m: \(\d+ \+ 703\) \/ \d+2 = \d+.\d BMI/)
      }
    })
  });
});
