class IFragment {
  constructor(ctx) {
    this._ctx = ctx;
  }

  get ctx() { return this._ctx; }

  draw() {}
}

export default IFragment;