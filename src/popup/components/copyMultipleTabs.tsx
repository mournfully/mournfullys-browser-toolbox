// Based off of https://github.com/kiichi/QuickCopyTitleAndURL
import { handleSaveInput, liveCache } from '../../utils/cache'

export function CopyMultipleTabs() {
  type tempEvent = Event & {
    submitter: HTMLElement;
  } & {
    currentTarget: HTMLFormElement;
    target: Element;
  }

  const copy_tabs = (e: tempEvent): void => {
    e.preventDefault()
    // submit(form)
    console.log(JSON.stringify(e.target))
  }

  return (
    <div>
      <label for="copyForm">Copy titles and urls into clipboard:</label>
      <form onSubmit={(e) => copy_tabs(e)}>
        <input type="radio" name="format" id="markdown" /><label for="markdown">[title](url)</label>
        <input type="radio" name="format" id="base" /><label for="base">title - url</label>
        <input type="radio" name="format" id="url" /><label for="url">url</label>
        <input type="radio" name="format" id="title" /><label for="title">title</label>
        <br />
        <input type="radio" name="scope" id="single" /><label for="single">current</label>
        <input type="radio" name="scope" id="all" /><label for="all">all</label>
        <input type="radio" name="scope" id="rightward" /><label for="rightward">rightwards</label>
        <input type="radio" name="scope" id="leftward" /><label for="leftward">leftwards</label>
        <br />
        <button type="submit" tabindex="6">Copy</button>
      </form>
    </div>
  )
}
