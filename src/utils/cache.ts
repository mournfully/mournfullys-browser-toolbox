import { debounce } from 'ts-debounce'

export enum StorageKey {
	singleLinkInput = 'singleLinkInput',
	bulkLinkInput = 'bulkLinkInput'
}
export interface StoredValues {
	singleLinkInput?: string
	bulkLinkInput?: string
}

export function handleTextInput(event) {
	// console.log(`handleInput`)
	const {id, value} = event.currentTarget
	setDebouncedLiveCache(id, value)
}

const setDebouncedLiveCache = debounce((id, value: string) => {
	// console.log(`setDebouncedLiveCache`)
	chrome.storage.local.set({ [id]: value })
}, 100)

export async function getAllValues() {
	const val = await chrome.storage.local.get(StorageKey.singleLinkInput)
	return val
}
