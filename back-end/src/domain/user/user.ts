export class User {
  private _id: string;

  private _firstName: string;

  private _lastName: string;


  get id() { return this._id; }
  get firstName() { return this._firstName; }
  get lastName() { return this._lastName; }

  constructor(id: string, firstName: string, lastName: string) {
    if (!id || !firstName || !lastName || lastName === '' || firstName === '') {
      throw Error('Names cannot be null or empty.');
    }
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
  }
}
