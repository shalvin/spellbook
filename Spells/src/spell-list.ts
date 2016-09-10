import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class SpellList {
    spells;
    selectedId = 0;
}