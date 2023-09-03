import { Setter } from 'solid-js'
import { StorageKey, getSingleValue } from './cache'

// Based off of https://github.com/refined-github/refined-github
export async function openSingleLink() { 
	const singleLinkInput = (await getSingleValue('singleLinkInput')).singleLinkInput
	chrome.tabs.create({ url: singleLinkInput })
}

// Based off of https://github.com/mohamedmansour/reload-all-tabs-extension
export async function reloadMultipleTabs() {
	const window: chrome.windows.Window = await chrome.windows.getCurrent()
	const tabs = await chrome.tabs.query({ windowId: window.id })
	for (const tab of tabs) {
		if (tab.id) chrome.tabs.reload(tab.id, { bypassCache: false })
	}
}

// Based off of https://github.com/htrinter/Open-Multiple-URLs
export async function extractMultipleLinks(setBulkLinkInput: Setter<string>) {
	let line, output = ''
	const bulkLinkInput = (await getSingleValue('bulkLinkInput')).bulkLinkInput

	const UNSUSPEND_MARVELLOUS_SUSPENDER_TAB = /chrome-extension:.*suspended.html#ttl=.*uri=/g
	const NO_SUSPENDED_URLS = bulkLinkInput.replace(UNSUSPEND_MARVELLOUS_SUSPENDER_TAB, '')
  
	const REMOVE_NON_URLS = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi
	while ((line = REMOVE_NON_URLS.exec(NO_SUSPENDED_URLS)) !== null) {
		output += line[0] + '\n'
	}

	if (output) {
		chrome.storage.local.set({ [StorageKey.bulkLinkInput]: output })
		setBulkLinkInput(output)
	}
}

export async function openMultipleTabs() {
	const URL_LINE_SPLIT_REGEX = /\r\n?|\n/g
	const URL_SCHEMES = ['http', 'https', 'file', 'view-source']

	const bulkLinkInput = (await getSingleValue('bulkLinkInput')).bulkLinkInput
	const urls = bulkLinkInput.split(URL_LINE_SPLIT_REGEX)

	for (let url of urls) {
		url = url.trim()
		if (url === '') continue
		if (URL_SCHEMES.indexOf(url.split(':')[0]) === -1) url = 'http://' + url
		chrome.tabs.create({url: url, active: false})
	}
}

