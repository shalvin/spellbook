import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Spells';
        config.map([
            { route: '',             moduleId: 'no-selection',   title: 'Select'},
            { route: 'spells/:spellName', moduleId: 'spell-detail', name: 'spells' }
        ]);

        this.router = router;
    }
}
