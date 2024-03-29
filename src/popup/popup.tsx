import { render } from 'solid-js/web'
import { createSignal, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import './style.css'

import { RadioButton } from './components/RadioButton'
import { handleTextInput, handleRadioInput, getAllValues } from '../utils/cache'
import { openSingleLink, extractMultipleLinks, openMultipleTabs, copyMultipleTabs, reloadMultipleTabs } from '../utils/core'

const app_container = document.querySelector('#app-container')
if (!app_container) {
	throw new Error('Cannot find app_container')
}

function Main() {
	const [singleLinkInput, setSingleLinkInput] = createSignal('')
	const [bulkLinkInput, setBulkLinkInput] = createSignal('')
	// https://hackernoon.com/state-management-in-solidjs-applications
	const [bulkTabStore, setBulkTabStore] = createStore({
		scope: [
			{ id: 0, name: 'single', checked: false },
			{ id: 1, name: 'all', checked: false },
			{ id: 2, name: 'leftward', checked: false },
			{ id: 3, name: 'rightward', checked: false },
		],
		format: [
			{ id: 0, name: 'markdown', checked: false },
			{ id: 1, name: 'markdownV2', checked: false },
			{ id: 2, name: 'base', checked: false },
			{ id: 3, name: 'url', checked: false },
			{ id: 4, name: 'title', checked: false },
		],
		spacing: [
			{ id: 0, name: 'seperateNone', checked: false },
			{ id: 1, name: 'seperateTabGroup', checked: false },
			{ id: 2, name: 'seperateTab', checked: false},
		]
	})

	// restore stored values
	onMount(async () => {
		const StoredValues = await getAllValues()
		// console.log(StoredValues)

		const singleLinkInput = StoredValues.singleLinkInput
		if (singleLinkInput) setSingleLinkInput(singleLinkInput)

		const bulkLinkInput = StoredValues.bulkLinkInput
		if (bulkLinkInput) setBulkLinkInput(bulkLinkInput)

		const bulkTabScope = StoredValues.bulkTabScope.id
		if (bulkTabScope) setBulkTabStore('scope', bulkTabScope, 'checked', true)

		const bulkCopyTabFormat = StoredValues.bulkCopyTabFormat.id
		if (bulkCopyTabFormat) setBulkTabStore('format', bulkCopyTabFormat, 'checked', true)

		const bulkOutputSpacing = StoredValues.bulkOutputSpacing.id
		if (bulkOutputSpacing) setBulkTabStore('spacing', bulkOutputSpacing, 'checked', true)
	})

	return (
		<div class="bg-zinc-900 h-[480px] w-96 text-xs text-white font-sans">
      
			<div class="flex w-full justify-between">
				<input
					onInput={(e) => handleTextInput(e)}
					type='url' id='singleLinkInput' spellcheck={false}
					autocomplete='off' autocapitalize='off'
					value={singleLinkInput()}
					class="grow bg-zinc-800 border-none" />
				<button
					class="flex ml-1"
					onClick={() => openSingleLink()}> Open URL
				</button>
			</div>
      
			<div>
				<textarea 
					onInput={(e) => handleTextInput(e)} 
					id="bulkLinkInput" wrap="soft" value={bulkLinkInput()} 
					class="bg-zinc-800 h-64 w-96 resize-none overflow-auto whitespace-pre">
				</textarea>
				<button id="extract" onClick={() => extractMultipleLinks(setBulkLinkInput)}>Extract URLs</button>
				<br />
				<button id="open" onClick={() => openMultipleTabs()}>Open Tabs</button>
			</div>
      
			<div>
				<form onChange={(e) => handleRadioInput(e)}>
					<RadioButton id="0" name="scope" value="single" checked={bulkTabStore.scope[0].checked} />
					<RadioButton id="1" name="scope" value="all" checked={bulkTabStore.scope[1].checked} />
					<RadioButton id="2" name="scope" value="leftward" checked={bulkTabStore.scope[2].checked} />
					<RadioButton id="3" name="scope" value="rightward" checked={bulkTabStore.scope[3].checked} />
				</form>
				<form onChange={(e) => handleRadioInput(e)}>
					<RadioButton id="0" name="format" value="markdown" text="[title](url)" checked={bulkTabStore.format[0].checked} />
					<RadioButton id="1" name="format" value="markdownV2" text='[title](url "title")' checked={bulkTabStore.format[1].checked} />
					<RadioButton id="2" name="format" value="base" text="title - url" checked={bulkTabStore.format[2].checked} />
					<RadioButton id="3" name="format" value="url" checked={bulkTabStore.format[3].checked} />
					<RadioButton id="4" name="format" value="title" checked={bulkTabStore.format[4].checked} />
					<br />
				</form>
				<form onChange={(e) => handleRadioInput(e)}>
					<RadioButton id="0" name="spacing" value="seperateNone" checked={bulkTabStore.spacing[0].checked}/>
					<RadioButton id="1" name="spacing" value="seperateTabGroup" checked={bulkTabStore.spacing[1].checked}/>
					<RadioButton id="2" name="spacing" value="seperateTab" checked={bulkTabStore.spacing[2].checked}/>
				</form>
				<button onClick={() => copyMultipleTabs()}>Copy Tabs</button>
			</div>
      
			<div>
				<button onClick={() => reloadMultipleTabs()}>Reload Tabs</button>
			</div>

		</div>
	)
}

render(Main, app_container)
