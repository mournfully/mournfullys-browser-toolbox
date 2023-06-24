// import { handleInput } from '../../libs/form'

export function OpenMultipleTabs() {
  return (
    <div>
      <textarea id="urls" wrap="soft" tabindex="1" class="bg-zinc-800 h-64 w-96 resize-none overflow-auto whitespace-pre"></textarea>
      <button id="extract" tabindex="6">Extract</button>
      <br />
      <button id="open" tabindex="2">Open</button>
    </div>
  )
}
