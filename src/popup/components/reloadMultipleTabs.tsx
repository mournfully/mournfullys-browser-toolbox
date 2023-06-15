// Based off of https://github.com/mohamedmansour/reload-all-tabs-extension

export function ReloadMultipleTabs() {
  async function reload_tabs() {
    const window: chrome.windows.Window = await chrome.windows.getCurrent()
    const tabs = await chrome.tabs.query({ windowId: window.id })
    for (const tab of tabs) {
        if (tab.id) chrome.tabs.reload(tab.id, { bypassCache: false })
    }
  }

  return (
    <div>
      <button onClick={() => reload_tabs()}>Reload all tabs in current window</button>
    </div>
  )
}
