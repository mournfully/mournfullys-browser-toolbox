type inputChangedEvent = Event & {
  currentTarget: HTMLFormElement
  target: Element
}

type submitFormEvent = Event & {
  submitter: HTMLElement
} & inputChangedEvent

export function saveChanges(e: inputChangedEvent) {
  console.log(e)
}

export function copyTabs(e: submitFormEvent) {
  e.preventDefault()
  console.log(e)
}
