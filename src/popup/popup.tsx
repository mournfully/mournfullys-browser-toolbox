import { render } from 'solid-js/web'
// https://stackoverflow.com/questions/66288645/vite-does-not-build-tailwind-based-on-config
import './style.css'

import CopyTabs from './components/copyMultipleTabs'
import { OpenSingleTab } from './components/openSingleTab'
import ReloadAllTabs from './components/reloadMultipleTabs'
import OpenMultipleTabs from './components/openMultipleTabs'
import { onCleanup, onMount } from 'solid-js'

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
      <hr/>
      <OpenMultipleTabs/>
      <hr/>
      <CopyTabs/>
      <hr/>
      <ReloadAllTabs/>
    </div>
  )
}

render(Main, app_container)
