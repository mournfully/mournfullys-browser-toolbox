import { Component } from 'solid-js'

const ReloadMultipleTabs: Component = () => {
  // https://developer.chrome.com/docs/extensions/reference/tabs/
  // https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/tutorial.tabs-manager/popup.js
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

export default ReloadMultipleTabs



