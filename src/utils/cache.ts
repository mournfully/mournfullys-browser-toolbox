import { debounce } from 'ts-debounce'

export enum StorageKey {
	singleLinkInput = 'singleLinkInput',
	bulkLinkInput = 'bulkLinkInput',
	bulkTabScope = 'bulkTabScope',
	bulkCopyTabFormat = 'bulkCopyTabFormat'
}
export interface StoredValues {
	singleLinkInput?: string
	bulkLinkInput?: string
	bulkTabScope?: string
	bulkCopyTabFormat?: string
}

export function handleTextInput(event) {
	const {id, value} = event.currentTarget
	setDebouncedLiveCache(id, value)
}

export function handleRadioInput(event) {
	const {name, value, id} = event.target
	if (name == 'scope') setDebouncedLiveCache('bulkTabScope', {id: id, value: value})
	if (name == 'format') setDebouncedLiveCache('bulkCopyTabFormat', {id: id, value: value})
}

const setDebouncedLiveCache = debounce((id, value) => {
	chrome.storage.local.set({ [id]: value })
}, 100)

export async function getAllValues() {
	const singleLinkInput = await chrome.storage.local.get(StorageKey.singleLinkInput)
	const bulkLinkInput = await chrome.storage.local.get(StorageKey.bulkLinkInput)
	const bulkTabScope = await chrome.storage.local.get(StorageKey.bulkTabScope)
  const bulkCopyTabFormat = await chrome.storage.local.get(StorageKey.bulkCopyTabFormat)
	return {
		// spread operator (...) for merging multiple objects
		...singleLinkInput,
		...bulkLinkInput,
		...bulkTabScope,
		...bulkCopyTabFormat
	}
}

export async function getSingleValue(key: keyof typeof StorageKey) {
	return await chrome.storage.local.get(key)
}
