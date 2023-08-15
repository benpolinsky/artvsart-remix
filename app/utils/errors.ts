export interface ErrorBagResponse {
  errors: Record<string, string>;
  status: number;
}

export class ErrorBag {
  #errors: Map<string, string> = new Map();

  add(label: string, error: Error | string) {
    this.#errors.set(label, typeof error === "string" ? error : error.message);
  }

  response(status: number = 400): ErrorBagResponse {
    return {
      errors: Object.fromEntries(this.#errors),
      status,
    };
  }

  hasErrors() {
    return !!this.#errors.size;
  }
}
