// https://github.com/typestack/class-validator/blob/develop/src/validation/ValidationError.ts

export interface IValidationError {
  target: any;
  value: string;
  property: string;
  children: Array<any>;
  // constraint could be empty when error is in nested schema
  constraints?: Record<string, string>;
}

enum ValidationTypes {
  WHITELIST = "whitelistValidation",
}

export function localizeErrors(messages: Array<IValidationError>): Record<string, string> {
  return messages.reduce((memo: Record<string, string>, message: IValidationError) => {
    const constraints = message.constraints || {};
    if (ValidationTypes.WHITELIST in constraints) {
      constraints[ValidationTypes.WHITELIST] = ValidationTypes.WHITELIST;
    }
    return {
      ...memo,
      // TODO get errors from nested schemas
      ...{[message.property]: `form.validations.${Object.values(constraints)[0]}`},
    };
  }, {});
}
