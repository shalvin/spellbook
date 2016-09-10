import {HttpClient} from 'aurelia-fetch-client';

let latency = 200;
let id = 0;
let httpClient = new HttpClient();

function getId(){
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
      });
  }
  
  getSpellList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = [];
        
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getContactDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveContact(contact){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter(x => x.id == contact.id)[0];

        if(found){
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        }else{
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
