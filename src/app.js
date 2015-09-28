export class App {
  configureRouter(config, router){
    config.title = 'OHS Bakeoff';
    config.map([
      { route: ['','home'],  name: 'home',      moduleId: 'home',      nav: true, title:'Home' },
      { route: 'about',         name: 'about',        moduleId: 'about',        nav: true, title:'About' }
    ]);

    this.router = router;
  }
}
