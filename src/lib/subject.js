export class Subject {
  #subscribers = [];

  constructor() {}

  next(value) {
    this._notify(value);
  }

  subscribe(cb) {
    this.#subscribers.push(cb);
  }

  _notify(value) {
    for (let sub of this.#subscribers) {
      sub(value);
    }
  }
}
