import { Setter } from 'solid-js'
import { StorageKey, getSingleValue } from './cache'
import ClipboardJS from 'clipboard'

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
    output += line[0] + `\n`
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
    if (URL_SCHEMES.indexOf(url.split(':')[0]) === -1) url = `http://` + url
    chrome.tabs.create({url: url, active: false})
  }
}

// Based off of https://github.com/kiichi/QuickCopyTitleAndURL
export async function copyMultipleTabs() {
  const bulkTabScope = (await getSingleValue('bulkTabScope')).bulkTabScope.value
  const bulkCopyTabFormat = (await getSingleValue('bulkCopyTabFormat')).bulkCopyTabFormat.value
  
	let options = {}
  let indexStart = 0
  let indexEnd: number
  let lines = ''
  
  // limit scope to tabs in current window
  Object.assign(options, {currentWindow: true})

  switch (bulkTabScope) {
    case 'single':
      // limit scope to current active tab
      Object.assign(options, {active: true})
      break
    case 'leftward':
      indexEnd = (await getCurrentTab()).index + 1
      break
    case 'rightward':
      indexStart = (await getCurrentTab()).index
      break  
  }

  chrome.tabs.query(options, (tabs) => {
    // fallback to default index end
    if (!indexEnd) indexEnd = tabs.length
    let previousGroupId = -1

    for (let i = indexStart; i < indexEnd; i++) {
      let title = tabs[i].title!
      let url = tabs[i].url!
      let line = ''

      // remove leading notification counts - https://youtu.be/bV0QNuhN9fU?t=64
      const LEADING_NOTIFICATION_COUNT = title.match(/^(\([0-9]+\) )?(.*)$/)
      if (LEADING_NOTIFICATION_COUNT) title = LEADING_NOTIFICATION_COUNT[2]

      switch (bulkCopyTabFormat) {
        case 'markdown':
          let embed = ''
          if (isImage(url)) embed = '!'
          line = `${embed}[${title}](${url})`
          break
        case 'base':
          line = `${title} - ${url}`
          break
        case 'url':
          line = `${url}`
          break
        case 'title':
          line = `${title}`
          break
      }
      
      if (true) { // toggle \n between tab groups        
          if (tabs.length > 1) {
            let groupId = tabs[i].groupId
            if (groupId != previousGroupId) {
            lines += `\n`
            previousGroupId = groupId
          }
        }
      }
      
      lines += line
      if (tabs.length > 1) lines += `\n`
    }

    ClipboardJS.copy(lines)
  })
  
}

// https://developer.chrome.com/docs/extensions/reference/tabs/#get-the-current-tab
async function getCurrentTab() {
	const options = { active: true, lastFocusedWindow: true }
	const [tab] = await chrome.tabs.query(options)
	return tab
}

function isImage(link: string) {
	return (link.indexOf('.jpg') > -1 || link.indexOf('.png') > -1)
}
