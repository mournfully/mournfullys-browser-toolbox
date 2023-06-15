import { handleSaveInput, liveCache } from '../../utils/cache'

export function OpenSingleTab() {
  function open_single_tab() { 
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
        onClick={() => open_single_tab()}> Open URL
      </button>
    </div >
  )
}

