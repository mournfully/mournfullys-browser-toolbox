import { getSingleValue } from './cache'
import ClipboardJS from 'clipboard'

// Based off of https://github.com/kiichi/QuickCopyTitleAndURL
export async function copyMultipleTabs() {
	const bulkTabScope = (await getSingleValue('bulkTabScope')).bulkTabScope.value
	const bulkCopyTabFormat = (await getSingleValue('bulkCopyTabFormat')).bulkCopyTabFormat.value
	const bulkOutputSpacing = (await getSingleValue('bulkOutputSpacing')).bulkOutputSpacing.value
  
	const options = {}
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
		let previousGroupId

		for (let i = indexStart; i < indexEnd; i++) {
			let title = tabs[i].title!
			const url = tabs[i].url!
			let embed = ''
			let line = ''

			// remove leading notification counts - https://youtu.be/bV0QNuhN9fU?t=64
			const LEADING_NOTIFICATION_COUNT = title.match(/^(\([0-9]+\) )?(.*)$/)
			if (LEADING_NOTIFICATION_COUNT) title = LEADING_NOTIFICATION_COUNT[2]

			switch (bulkCopyTabFormat) {
			case 'markdown':
				if (isImage(url)) embed = '!'
				line = `${embed}[${title}](${url})`
				break
			case 'markdownV2':
				if (isImage(url)) embed = '!'
				line = `${embed}[${title}](${url} "${title}")`
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
      
			if (bulkOutputSpacing == 'seperateTabGroup') { // toggle \n between tab groups        
				if (tabs.length > 1) {
					if (i == 0) {
						previousGroupId = tabs[i].groupId
					}

					const groupId = tabs[i].groupId
					if (groupId != previousGroupId) {
						lines += '\n'
						previousGroupId = groupId
					}
				}
			}
      
			lines += line
			if (tabs.length > 1) {
				lines += '\n'
				if (bulkOutputSpacing == 'seperateTab') {
					lines += '\n' // toggle extra \n between tabs        
				} 
			}
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

