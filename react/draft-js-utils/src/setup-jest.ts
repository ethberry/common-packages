import utils from "util";

// https://github.com/jsdom/jsdom/issues/2524
if (typeof globalThis.TextEncoder === "undefined") {
  globalThis.TextEncoder = utils.TextEncoder;
}

// https://github.com/jsdom/jsdom/issues/2448
if (typeof globalThis.MessageChannel === "undefined") {
  globalThis.MessageChannel = jest.fn().mockImplementation(() => {
    let onmessage: (cb: { data: any }) => void;
    return {
      port1: {
        set onmessage(cb: (cb: { data: any }) => void) {
          onmessage = cb;
        },
      },
      port2: {
        postMessage: (data: any) => {
          onmessage?.({ data });
        },
      },
    };
  });
}
