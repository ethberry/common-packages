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

export const licenseRevoked = (): string => {
  return wrapMessage([
    "Gemunion Studio: License is revoked.",
    "",
    "Your license-messages for Gemunion Framework was revoked",
  ]);
};

export const licenseNotFound = (): string => {
  return wrapMessage([
    "Gemunion Studio: License key not found.",
    "",
    "You did not enter a license-messages key, please check your .env file",
  ]);
};

export const licenseExpired = (): string => {
  return wrapMessage([
    "Gemunion Studio: License is expired.",
    "",
    "Your subscription for Gemunion Framework has expired.",
  ]);
};

export const downForMaintenance = (): string => {
  return "Down for maintenance";
};
