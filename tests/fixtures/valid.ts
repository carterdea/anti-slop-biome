type Payload = {
  readonly value: string;
};

const handlers = {
  start: (payload: Payload) => payload.value,
} satisfies Record<string, (payload: Payload) => string>;

const parsePayload = (input: string): Payload => ({ value: input });

void handlers;
void parsePayload;
