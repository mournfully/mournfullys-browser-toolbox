// import { handleInput } from '../../libs/form'

export function OpenMultipleTabs() {
  return (
    <div>
      <label for="urls">Open a list of urls / Extract urls from text:</label>
      <textarea id="urls" wrap="soft" tabindex="1" class="bg-zinc-800 h-64 w-96 resize-none overflow-auto whitespace-pre"></textarea>
      <button id="extract" tabindex="6">Extract URLs</button>
      <button id="open" tabindex="2">Open URLs</button>
      <span id="tabcount">
        <abbr title="Opening too many tabs at once may lead to long wait times or crash your browser.">
          &#9432; <span>will open <span id="tabcount-number">0</span> new <span
            id="tabcount-tab-label">tabs</span></span>
        </abbr>
      </span>
    </div>
  )
}
