'use strict';
export class Student {
  _id: String;
  name: String;
  address: String;
  phones: [{
    key: String;
    value: String;
  }]

  constructor(_id = '', name = '', address = '', phones = null) {
    this._id = _id;
    this.name = name;
    this.address = address;
    this.phones = phones;
  }
}


