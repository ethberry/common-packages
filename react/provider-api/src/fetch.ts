import { parse } from "content-disposition";

import { history } from "@gemunion/history";

import { ApiError } from "./error";

export const fetchJson = (input: RequestInfo, init?: RequestInit): Promise<any> => {
  return window.fetch(input, init).then(response => {
    if (response.status === 204) {
      return;
    }
    if (response.status === 401) {
      history.push("/login");
      return;
    }
    if (![200, 201].includes(response.status)) {
      return response.json().then(json => {
        throw new ApiError(json.message, response.status);
      });
    }
    return response.json();
  });
};

export const saveData = (blob: Blob, fileName: string): void => {
  const a = document.createElement("a");
  document.body.appendChild(a); // FireFox
  a.style.display = "none";
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const fetchFile = (input: RequestInfo, init?: RequestInit): Promise<void> => {
  return window.fetch(input, init).then(async response => {
    if (response.status === 204) {
      return;
    }
    if (response.status === 401) {
      history.push("/login");
      return;
    }
    if (![200, 201].includes(response.status)) {
      return response.json().then(json => {
        throw new ApiError(json.message, response.status);
      });
    }
    const contentDisposition = response.headers.get("Content-Disposition");
    const { filename } = contentDisposition ? parse(contentDisposition).parameters : { filename: "" };
    // it is fine to keep filename empty, then real name would be something like uuid
    return response.blob().then(blob => {
      saveData(blob, filename);
    });
  });
};
