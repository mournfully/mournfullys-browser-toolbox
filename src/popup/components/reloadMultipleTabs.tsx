// Based off of https://github.com/mohamedmansour/reload-all-tabs-extension

export function ReloadMultipleTabs() {
  async function reloadTabs() {
    const window: chrome.windows.Window = await chrome.windows.getCurrent()
    const tabs = await chrome.tabs.query({ windowId: window.id })
    for (const tab of tabs) {
      if (tab.id) chrome.tabs.reload(tab.id, { bypassCache: false })
    }
  }

  return (
    <div>
      <button onClick={() => reloadTabs()}>Reload</button>
    </div>
  )
}
