import utils from "util";

if (typeof globalThis.TextEncoder === "undefined") {
  globalThis.TextEncoder = utils.TextEncoder;
}
