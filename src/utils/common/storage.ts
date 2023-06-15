// import chrome from 'webextension-polyfill';

export enum StorageKey {
  urlList = 'txt', // open-tabs input
  tabFormat = 'tabFormat', // md, url, title
  tabScope = 'tabScope', // active, all, rightward
  urlInput = 'urlInput' // refined-github input
}

export interface StoredOptions {
  [StorageKey.urlList]: string;
  [StorageKey.tabFormat]: string;
  [StorageKey.tabScope]: string;
  [StorageKey.urlInput]: string;
}

export async function getStoredOptions(): Promise<StoredOptions> {
  const txtVal = await chrome.storage.local.get(StorageKey.urlList);
  const tabFormatVal = await chrome.storage.local.get(StorageKey.tabFormat);
  const tabScopeVal = await chrome.storage.local.get(StorageKey.tabScope);
  const urlInputVal = await chrome.storage.local.get(StorageKey.urlInput);

  return {
    txt: txtVal?.txt || '',
    tabFormat: tabFormatVal?.tabFormat || '',    
    tabScope: tabScopeVal?.tabScope || '',    
    urlInput: urlInputVal?.urlInput || '',
  };
}

export async function storeValue<T>(key: StorageKey, value: T): Promise<void> {
  await chrome.storage.local.set({ [key]: value });
}
