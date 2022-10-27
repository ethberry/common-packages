export const save = (key: string, profile: any | null): void => {
  const json = JSON.stringify(profile);
  localStorage.setItem(key, json);
};
