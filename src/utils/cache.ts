import { createStore } from 'solid-js/store'
import { debounce } from "@solid-primitives/scheduled"

type EventType = InputEvent & {
	currentTarget: HTMLInputElement
	target: HTMLInputElement
}

type LiveCacheFields = {
	single_url_input?: string
}

export const [liveCache, setLiveCache] = createStore<LiveCacheFields>({
	single_url_input: "",
})

const setDebouncedLiveCache = debounce((liveCache, id, value: string) => {
	setLiveCache(id as keyof LiveCacheFields, value)
	console.log(JSON.stringify(liveCache))
}, 250)

export const handleSaveInput = (event: EventType) => {
	const {id, value} = event.currentTarget
	setDebouncedLiveCache(liveCache, id, value)
}
