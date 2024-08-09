type LocalStorageValue = string | number | Record<string, any> | null;

export const readFromLS = <T extends LocalStorageValue>(key: string, initialValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : initialValue;
};

export const saveToLS = <T extends LocalStorageValue>(key: string, data: T | null): void => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};
