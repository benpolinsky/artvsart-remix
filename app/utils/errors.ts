export interface ErrorBagResponse {
  errors: Record<string, string>;
}

export class ErrorBag {
  #errors: Map<string, string> = new Map();

  add(label: string, error: Error | string) {
    this.#errors.set(label, typeof error === "string" ? error : error.message);
  }

  response(): ErrorBagResponse {
    return {
      errors: Object.fromEntries(this.#errors),
    };
  }

  hasErrors() {
    return !!this.#errors.size;
  }
}
