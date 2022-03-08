const wrapMessage = (message: Array<string>): string => {
  return [
    "",
    "************************************************************",
    "*************************************************************",
    "",
    ...message,
    "Please visit https://gemunion.io/ for more information.",
    "",
    "*************************************************************",
    "*************************************************************",
  ].join("\n");
};

export const licenseRevoked = (): void => {
  // prettier-ignore
  wrapMessage([
    "Gemunion Studio: License is revoked.",
    "",
    "Your license-messages for Gemunion Framework was revoked",
  ]);
};

export const licenseNotFound = (): void => {
  // prettier-ignore
  wrapMessage([
    "Gemunion Studio: License key not found.",
    "",
    "You did not enter a license-messages key, please check your .env file",
  ]);
};

export const licenseExpired = (): void => {
  // prettier-ignore
  wrapMessage([
    "Gemunion Studio: License is expired.",
    "",
    "Your subscription for Gemunion Framework has expired.",
  ]);
};
