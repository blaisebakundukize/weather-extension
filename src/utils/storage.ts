import { OpenWeatherTempScale } from './api';

export interface ILocalStorage {
  cities?: string[];
  options?: ILocalStorageOptions;
}

export interface ILocalStorageOptions {
  tempScale: OpenWeatherTempScale;
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

export const setStoredOptions = (
  options: ILocalStorageOptions
): Promise<void> => {
  const vals: ILocalStorage = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
};

export const getStoredOptions = (): Promise<ILocalStorageOptions> => {
  const keys: LocalStorageKeys[] = ['options'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ILocalStorage) => {
      resolve(res.options);
    });
  });
};
