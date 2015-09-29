import {App} from '../../src/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var app
    , mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    app = new App(mockedRouter);
    app.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(app.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(app.router.title).toEqual('OHS Bakeoff');
  });

  it('should have a home route', () => {
    expect(app.router.routes).toContain({ route: ['','home'], name: 'home',  moduleId: 'home/home', nav: true, title:'Home' });
  });

  it('should have an about route', () => {
     expect(app.router.routes).toContain({ route: 'about', name: 'about', moduleId: 'about/about', nav: true, title:'About' });
  });
});
