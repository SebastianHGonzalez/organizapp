type Context = Record<string, unknown>;

class InvariantError extends Error {
  constructor(msg: string, ctx?: Context, opt?: ErrorOptions) {
    super(msg, opt);
    this.name = "InvariantError";

    if (ctx) {
      this.message =
        this.name + "\n" + msg + "\n" +"context: " + JSON.stringify(ctx, undefined, 2);
    }
  }
}

export function invariant(
  b: boolean,
  msg: string,
  context?: Context
): b is true {
  if (!b) {
    throw new InvariantError(msg, context);
  }

  return true;
}
