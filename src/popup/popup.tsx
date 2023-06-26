import { render } from 'solid-js/web'
import './style.css'
import { handleTextInput, handleRadioInput, getAllValues } from '../utils/cache'
import { createSignal, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'

import { openSingleLink, reloadMultipleTabs, copyMultipleTabs } from '../utils/core'
import { RadioButton } from './components/RadioButton'

const app_container = document.querySelector("#app-container")
if (!app_container) {
  throw new Error("Cannot find app_container")
}

function Main() {
  const [singleLinkInput, setSingleLinkInput] = createSignal('')
  const [bulkTabStore, setBulkTabStore] = createStore({
    scope: [
      { id: 0, name: 'single', checked: false },
      { id: 1, name: 'all', checked: false },
      { id: 2, name: 'leftward', checked: false },
      { id: 3, name: 'rightward', checked: false },
    ],
    format: [
      { id: 0, name: 'markdown', checked: false },
      { id: 1, name: 'base', checked: false },
      { id: 2, name: 'url', checked: false },
      { id: 3, name: 'title', checked: false },
    ]
  })
 
  // restore stored values
  onMount(async () => {
    const StoredValues = await getAllValues()
   
    const singleLinkInput = StoredValues.singleLinkInput
    if (singleLinkInput) setSingleLinkInput(singleLinkInput)

    const bulkTabScope = StoredValues.bulkTabScope.id
    if (bulkTabScope) setBulkTabStore('scope', bulkTabScope, 'checked', true)
    
    const bulkCopyTabFormat = StoredValues.bulkCopyTabFormat.id
    if (bulkCopyTabFormat) setBulkTabStore('format', bulkCopyTabFormat, 'checked', true)
  })

  return (
    <div id="app-container" class="bg-zinc-900 h-[480px] w-96 text-xs text-white font-sans">

      <div>
        <form onSubmit={(e) => openSingleLink(e)} class="flex w-full justify-between">
          <input
            onInput={(e) => handleTextInput(e)}
            type='url' id='singleLinkInput' spellcheck={false}
            autocomplete='off' autocapitalize='off'
            value={singleLinkInput()}
            class="grow bg-zinc-800 border-none" />
          <button
            class="flex ml-1"
            type="submit"> Open URL
          </button>
        </form>

        <div>
          <textarea id="urls" wrap="soft" onChange={(e) => console.log(e)} class="bg-zinc-800 h-64 w-96 resize-none overflow-auto whitespace-pre"></textarea>
          <button id="extract" onClick={(e) => console.log(e)}>Extract URLs</button>
          <br />
          <button id="open" onClick={(e) => console.log(e)}>Open Tabs</button>
        </div>

        <div>
          <button onClick={() => reloadMultipleTabs()}>Reload Tabs</button>
        </div>

        <form onChange={(e) => handleRadioInput(e)}>
          <RadioButton 
            id="0"
            value="single" 
            checked={bulkTabStore.scope[0].checked}
            name="scope" />
          <RadioButton 
            id="1"
            value="all" 
            checked={bulkTabStore.scope[1].checked}
            name="scope" />
          <RadioButton 
            id="2"
            value="leftward" 
            checked={bulkTabStore.scope[2].checked}
            name="scope" />
          <RadioButton 
            id="3"
            value="rightward" 
            checked={bulkTabStore.scope[3].checked}
            name="scope" />
          </form>
          <form onChange={(e) => handleRadioInput(e)}>
          <RadioButton 
            id="0"
            value="markdown" 
            text="[title](url)" 
            checked={bulkTabStore.format[0].checked}
            name="format" />
          <RadioButton 
            id="1"
            value="base" 
            text="title - url" 
            checked={bulkTabStore.format[1].checked}
            name="format" />
          <RadioButton 
            id="2"
            value="url" 
            checked={bulkTabStore.format[2].checked}
            name="format" />
          <RadioButton 
            id="3"
            value="title" 
            checked={bulkTabStore.format[3].checked}
            name="format" />
          <br />
          <button onClick={(e) => copyMultipleTabs(e)}>Copy Tabs</button>
        </form>
      </div>

    </div>
  )
}



render(Main, app_container)