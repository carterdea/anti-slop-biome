type Hidden = unknown;
type UnsafeBag = Record<string, unknown>;
type ObjectHandler = (value: object) => void;

const known: Record<string, string> = { start: "ready" };
const widened: object = { start: "ready" };
const chained = known as object as UnsafeBag;
const options = { ...(known ? { known } : {}) };
const dataShape = { ready: true };

const parse = (input: unknown): unknown => {
  if (typeof input === "string") return input;
  return Reflect.get(input as object, "value");
};

const invoke = (handler: ObjectHandler) => Reflect.apply(handler, undefined, [widened]);

vi.mock("./dependency");

void chained;
void options;
void dataShape;
void parse;
void invoke;
