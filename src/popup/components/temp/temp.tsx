import styles from './temp.module.scss'

const container = () => {
  return (
    <div class={styles.main}>
      <section>
        <label for="urls">Open a list of urls / Extract urls from text:</label>
        <textarea id="urls" wrap="soft" tabindex="1"></textarea>
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

      <section>
        <label for="copy">copy titles and urls into clipboard</label>
        <form id="copy">
          <input type="radio" name="format" id="0" /><label for="0">[title][url]</label>
          <input type="radio" name="format" id="1" /><label for="1">title - url</label>
          <input type="radio" name="format" id="2" /><label for="2">title</label>
          <input type="radio" name="format" id="3" /><label for="3">url</label>
          <input type="radio" name="scope" id="10" /><label for="10">current</label>
          <input type="radio" name="scope" id="11" /><label for="11">all</label>
          <input type="radio" name="scope" id="12" /><label for="12">rightwards</label>
          <input type="radio" name="scope" id="13" /><label for="13">leftwards</label>
        </form>
      </section>
      <section>
        <button id="copy" tabindex="6">copy</button>
      </section>

      <section>
        <button id="reload" tabindex="6">Reload all tabs in current window</button>
      </section>

    </div>
  )
}

export default container
