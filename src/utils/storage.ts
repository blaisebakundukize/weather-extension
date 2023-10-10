export interface ILocalStorage {
  cities?: string[];
}

export type LocalStorageKeys = keyof ILocalStorage;

export const setStoredCities = (cities: string[]): Promise<void> => {
  const vals: ILocalStorage = {
    cities,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
};

export const getStoredCities = (): Promise<string[]> => {
  const keys: LocalStorageKeys[] = ['cities'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ILocalStorage) => {
      resolve(res.cities ?? []);
    });
  });
};
