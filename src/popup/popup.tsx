import { render } from 'solid-js/web'
import './style.css'
import { handleTextInput, getAllValues } from '../utils/cache'
import { createSignal, onMount } from 'solid-js'

import { openSingleLink, reloadMultipleTabs } from '../utils/core'

const app_container = document.querySelector("#app-container")
if (!app_container) {
  throw new Error("Cannot find app_container")
}

function Main() {
  const [singleLinkInput, setSingleLinkInput] = createSignal('')
  
  // restore stored values
  onMount(async () => {
    const StoredValues = await getAllValues()
    setSingleLinkInput(StoredValues.singleLinkInput)
  })

  return (
    <div id="app-container" class="bg-zinc-900 h-[480px] w-96 text-xs text-white font-sans">
      <div>
        <div class="flex w-full justify-between">
          <input
            onInput={(e) => handleTextInput(e)}
            type='url' id='singleLinkInput' spellcheck={false}
            autocomplete='off' autocapitalize='off'
            value={singleLinkInput()}
            class="grow bg-zinc-800 border-none" />
          <button
            class="flex ml-1"
            onClick={() => {
              const value = singleLinkInput()
              openSingleLink(value)
            }}> Open URL
          </button>
        </div >

        <div>
          <textarea id="urls" wrap="soft" class="bg-zinc-800 h-64 w-96 resize-none overflow-auto whitespace-pre"></textarea>
          <button id="extract">Extract URLs</button>
          <br />
          <button id="open">Open Tabs</button>
        </div>

        <form onChange={(e) => console.log(e)} onSubmit={(e) => console.log(e)}>
          <input type="radio" name="format" id="markdown" /><label for="markdown">[title](url)</label>
          <input type="radio" name="format" id="base" /><label for="base">title - url</label>
          <input type="radio" name="format" id="url" /><label for="url">url</label>
          <input type="radio" name="format" id="title" /><label for="title">title</label>
          <br />
          <input type="radio" name="scope" id="single" /><label for="single">current</label>
          <input type="radio" name="scope" id="all" /><label for="all">all</label>
          <input type="radio" name="scope" id="leftward" /><label for="leftward">leftwards</label>
          <input type="radio" name="scope" id="rightward" /><label for="rightward">rightwards</label>
          <br />
          <button type="submit">Copy Tabs</button>
        </form>
      </div>

      <div>
        <button onClick={() => reloadMultipleTabs()}>Reload Tabs</button>
      </div>
    </div>
  )
}

render(Main, app_container)