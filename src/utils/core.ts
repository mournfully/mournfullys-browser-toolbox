import { StorageKey, getAllValues } from './cache'

// Based off of https://github.com/refined-github/refined-github
export async function openSingleLink() { 
  const cached = await chrome.storage.local.get(StorageKey.singleLinkInput)
  chrome.tabs.create({ url: cached.singleLinkInput })
}

// Based off of https://github.com/mohamedmansour/reload-all-tabs-extension
export async function reloadMultipleTabs() {
  const window: chrome.windows.Window = await chrome.windows.getCurrent()
  const tabs = await chrome.tabs.query({ windowId: window.id })
  for (const tab of tabs) {
    if (tab.id) chrome.tabs.reload(tab.id, { bypassCache: false })
  }
}

// Based off of https://github.com/kiichi/QuickCopyTitleAndURL
export async function copyMultipleTabs() {
  const StoredValues = await getAllValues()
  console.log(StoredValues)
  // console.log(JSON.stringify(scope) + JSON.stringify(format))
}
