// Based off of https://github.com/refined-github/refined-github
export async function openSingleLink(singleLinkInput: string) { 
  chrome.tabs.create({ url: singleLinkInput })
}

// Based off of https://github.com/mohamedmansour/reload-all-tabs-extension
export async function reloadMultipleTabs() {
  const window: chrome.windows.Window = await chrome.windows.getCurrent()
  const tabs = await chrome.tabs.query({ windowId: window.id })
  for (const tab of tabs) {
    if (tab.id) chrome.tabs.reload(tab.id, { bypassCache: false })
  }
}