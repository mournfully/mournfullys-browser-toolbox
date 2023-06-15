import { render } from 'solid-js/web'
import { onCleanup, onMount } from 'solid-js'
import './style.css'

import { CopyMultipleTabs } from './components/copyMultipleTabs'
import { OpenSingleTab } from './components/openSingleTab'
import { ReloadMultipleTabs } from './components/reloadMultipleTabs'
import { OpenMultipleTabs } from './components/openMultipleTabs'

const app_container = document.querySelector("#app-container")
if (!app_container) {
    throw new Error("Cannot find app_container")
}

function Main() {
  onMount(() => { 
    // chrome.storage.local.get([key]).then((result) => {
    // 	console.log("Value currently is " + result.key);
    // })  
  })
  onCleanup(() => { 
    // chrome.storage.local.set({ [key]: value })
  })

  return (
    <div class="bg-zinc-900 h-[480px] w-96 text-xs text-white font-sans">
      <OpenSingleTab />
      <hr />
      <OpenMultipleTabs/>
      <hr />
      <CopyMultipleTabs/>
      <hr />
      <ReloadMultipleTabs/>
    </div>
  )
}

render(Main, app_container)
