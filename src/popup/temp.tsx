const app = () => {
  return (
    <div class="bg-zinc-900 h-[480px] w-96 text-xs text-white font-sans">
      <section class="flex w-full justify-between">
        <input type="url" id="url-input" placeholder="Open a url shortcut" spellcheck={false} autocomplete='off' autocapitalize='off'
          class="grow bg-zinc-800 border-none"/>
          <button tabindex="6" class="flex ml-1">Open URL</button>
      </section>
      <hr />

      <section>
        <label for="urls">Open a list of urls / Extract urls from text:</label>
        <textarea id="urls" wrap="soft" tabindex="1" class="bg-zinc-800 h-64 w-96 resize-none overflow-auto whitespace-pre"></textarea>
      </section>
      <section>
        <button id="extract" tabindex="6">Extract URLs</button>
        <button id="open" tabindex="2">Open URLs</button>
        <span id="tabcount">
          <abbr title="Opening too many tabs at once may lead to long wait times or crash your browser.">
            &#9432; <span>will open <span id="tabcount-number">0</span> new <span
              id="tabcount-tab-label">tabs</span></span>
          </abbr>
        </span>
      </section>
      <hr />

      <section>
        <label for="copyForm">Copy titles and urls into clipboard:</label>
        <form id="copyForm">
          <input type="radio" name="format" id="markdown" /><label for="markdown">[title](url)</label>
          <input type="radio" name="format" id="base" /><label for="base">title - url</label>
          <input type="radio" name="format" id="url" /><label for="url">url</label>
          <input type="radio" name="format" id="title" /><label for="title">title</label>
          <br />
          <input type="radio" name="scope" id="single" /><label for="single">current</label>
          <input type="radio" name="scope" id="all" /><label for="all">all</label>
          <input type="radio" name="scope" id="rightward" /><label for="rightward">rightwards</label>
          <input type="radio" name="scope" id="leftward" /><label for="leftward">leftwards</label>
        </form>
      </section>
      <section>
        <button id="copy" tabindex="6">Copy</button>
      </section>
      <hr />

      <section>
        <button id="reload" tabindex="6">Reload all tabs in current window</button>
      </section>

    </div>
  )
}

export default app
