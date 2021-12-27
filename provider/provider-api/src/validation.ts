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

function getParentProperty(parentProperty: string, property: string): string {
  return parentProperty ? `${parentProperty}.${property}` : property;
}

export function localizeErrors(messages: Array<IValidationError>, parentProperty = ""): Record<string, string> {
  return messages.reduce((memo: Record<string, string>, message: IValidationError) => {
    const constraints = message.constraints || {};
    if (ValidationTypes.WHITELIST in constraints) {
      constraints[ValidationTypes.WHITELIST] = ValidationTypes.WHITELIST;
    }

    let result = { ...memo };

    if (Object.values(constraints)[0]) {
      const validationKey = getParentProperty(parentProperty, message.property);
      result[validationKey] = `form.validations.${Object.values(constraints)[0]}`;
    }

    if (message.children) {
      const nextParentProperty = getParentProperty(parentProperty, message.property);
      result = {
        ...result,
        ...localizeErrors(message.children, nextParentProperty),
      };
    }

    return result;
  }, {});
}
