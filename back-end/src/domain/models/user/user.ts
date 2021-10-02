export class User {
  private _id: number;

  private _firstName: string;

  private _lastName: string;


  get id() { return this._id; }
  get firstName() { return this._firstName; }
  get lastName() { return this._lastName; }

  constructor(id: number, firstName: string, lastName: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
  }
}
