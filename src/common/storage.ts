import browser from 'webextension-polyfill';

export enum StorageKey {
  urlList = 'txt',
}

export interface StoredOptions {
  [StorageKey.urlList]: string;
}

export async function getStoredOptions(): Promise<StoredOptions> {
  const txtVal = await browser.storage.local.get(StorageKey.urlList);

  return {
    txt: txtVal?.txt || '',
  };
}

export async function storeValue<T>(key: StorageKey, value: T): Promise<void> {
  await browser.storage.local.set({ [key]: value });
}
