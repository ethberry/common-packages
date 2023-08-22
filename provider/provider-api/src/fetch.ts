import { parse } from "content-disposition";
import { useNavigate } from "react-router";

import { history } from "@gemunion/history";

import { ApiError } from "./error";

export const fetchJson = (input: RequestInfo, init?: RequestInit): Promise<any> => {
  return window.fetch(input, init).then(response => {
    if (response.status === 204) {
      return null;
    }
    if (response.status === 401) {
      window.localStorage.clear();
      history.push("/login");
      throw new ApiError("unauthorized", response.status);
    }
    if (![200, 201].includes(response.status)) {
      return response.json().then((json: Error) => {
        throw new ApiError(json.message, response.status);
      });
    }
    return response.json();
  });
};

export const useFetchJson = () => {
  const navigate = useNavigate();

  return {
    fetchJson: (input: RequestInfo, init?: RequestInit): Promise<any> => {
      return window.fetch(input, init).then(response => {
        if (response.status === 204) {
          return null;
        }
        if (response.status === 401) {
          window.localStorage.clear();
          navigate("/login");
          throw new ApiError("unauthorized", response.status);
        }
        if (response.status === 402) {
          navigate("/rate-plans");
          throw new ApiError("paymentRequired", response.status);
        }
        if (![200, 201].includes(response.status)) {
          return response.json().then((json: Error) => {
            throw new ApiError(json.message, response.status);
          });
        }
        return response.json();
      });
    },
  };
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

export const useFetchFile = () => {
  const navigate = useNavigate();

  return {
    fetchFile: (input: RequestInfo, init?: RequestInit): Promise<void> => {
      return window.fetch(input, init).then(async response => {
        if (response.status === 204) {
          return;
        }
        if (response.status === 401) {
          window.localStorage.clear();
          navigate("/login");
          return;
        }
        if (![200, 201].includes(response.status)) {
          return response.json().then((json: Error) => {
            throw new ApiError(json.message, response.status);
          });
        }
        const contentDisposition = response.headers.get("Content-Disposition");
        const parameters = contentDisposition ? parse(contentDisposition).parameters : {};
        // it is fine to keep filename empty, then real name would be something like uuid
        return response.blob().then(blob => {
          saveData(blob, parameters.filename);
        });
      });
    },
  };
};
