import browser from 'webextension-polyfill';

export enum StorageKey {
  urlList = 'txt', // open-tabs input
  tabFormat = 'tabFormat', // md, base, url, title
  tabScope = 'tabScope', // current, all, rightward, leftward
  urlInput = 'urlInput' // refined-github input
}

export interface StoredOptions {
  [StorageKey.urlList]: string;
  [StorageKey.tabFormat]: string;
  [StorageKey.tabScope]: string;
  [StorageKey.urlInput]: string;
}

export async function getStoredOptions(): Promise<StoredOptions> {
  const txtVal = await browser.storage.local.get(StorageKey.urlList);
  const tabFormatVal = await browser.storage.local.get(StorageKey.tabFormat);
  const tabScopeVal = await browser.storage.local.get(StorageKey.tabScope);
  const urlInputVal = await browser.storage.local.get(StorageKey.urlInput);

  return {
    txt: txtVal?.txt || '',
    tabFormat: tabFormatVal?.tabFormat || '',    
    tabScope: tabScopeVal?.tabScope || '',    
    urlInput: urlInputVal?.urlInput || '',
  };
}

export async function storeValue<T>(key: StorageKey, value: T): Promise<void> {
  await browser.storage.local.set({ [key]: value });
}
