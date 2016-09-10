import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api';
import { areEqual } from './utility';

interface Spell {
    name: string;
}

@inject(WebAPI)
export class ContactDetail {
    routeConfig;
    spell: Spell;
    originalSpell: Spell;

    constructor(private api: WebAPI) { }

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        return this.api.getSpellDetails(params.id).then(spell => {
            console.log(spell);
            this.spell = <Spell>spell;
            this.routeConfig.navModel.setTitle(this.spell.name);
            this.originalSpell = JSON.parse(JSON.stringify(this.spell));
        });
    }

    canDeactivate() {
        return true;
    }
}