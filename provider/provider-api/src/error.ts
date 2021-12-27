import { IValidationError, localizeErrors } from "./validation";

export class ApiError extends Error {
  constructor(public readonly message: string, public readonly status: number) {
    super(message);
  }

  getLocalizedValidationErrors(): Record<string, string> {
    if (this.status === 400) {
      return localizeErrors(this.message as unknown as Array<IValidationError>);
    }
    return {};
  }
}
