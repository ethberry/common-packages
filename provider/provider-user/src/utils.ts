export const save = (key: string, profile: any): void => {
  const json = JSON.stringify(profile);
  localStorage.setItem(key, json);
};
