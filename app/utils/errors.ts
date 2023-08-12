export class ErrorBag {
  #errors: Record<string, string> = {};
  add(label: string, message: string) {
    this.#errors[label] = message;
  }

  response() {
    return {
      errors: this.#errors,
    };
  }
}
