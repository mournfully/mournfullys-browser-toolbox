// Based off of https://github.com/refined-github/refined-github

import { handleSaveInput, liveCache } from '../../utils/cache'

export function OpenSingleTab() {
  async function openTab() { 
    chrome.tabs.create({ url: liveCache.single_url_input })
  }
  
  return (
    <div class="flex w-full justify-between">
      <input
        onInput={handleSaveInput}
        type="url" id="single_url_input" spellcheck={false}
        autocomplete='off' autocapitalize='off'
        placeholder="Open a url shortcut"
        class="grow bg-zinc-800 border-none" />
      <button
        tabindex="6"
        class="flex ml-1"
        onClick={() => openTab()}> Open URL
      </button>
    </div >
  )
}
