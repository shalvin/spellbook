import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class SpellList {
    spells;
    selectedId = 0;

    constructor(private api: WebAPI) { }

    created():void {
        this.api.getSpellList().then(spells => this.spells = spells);
    }

    select(spell):boolean {
        this.selectedId = spell.id;
        return true;
    }
}
