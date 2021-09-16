const year = "([12][0-9]{3})";
const month = "(0[1-9]|1[0-2])";
const day = "([12][0-9]|0[1-9]|3[01])";
const hour = "([01][0-9]|2[0-3])";
const minute = "([0-5][0-9])";
const second = "([0-5][0-9])";
const milli = "([0-9]{3})";

const ISO8601 = `${year}-${month}-${day}T${hour}:${minute}:${second}.${milli}Z`;

export const reISO8601 = new RegExp(`^${ISO8601}$`);
export const reDateRange = new RegExp(`^${ISO8601}\\/${ISO8601}$`);
