import {HttpClient} from 'aurelia-fetch-client';

let latency = 200;
let id = 0;
let httpClient = new HttpClient();

function generateId() {
  return ++id;
}

let spells = [];

export class WebAPI {
  isRequesting = false;

  constructor() {
      httpClient.fetch('spells.json')
      .then(response => response.json())
      .then(data => {
        spells = data.spellList;
        for (let spell of spells) {
          spell.id = generateId();
        }
      });
  }
  
  getSpellList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(spells);
        this.isRequesting = false;
      }, latency);
    });
  }

  getSpellDetails(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = spells.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }
}
