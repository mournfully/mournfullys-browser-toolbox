// Based off of https://github.com/kiichi/QuickCopyTitleAndURL

import { handleSaveInput, liveCache } from '../../utils/cache'
import { saveChanges, copyTabs } from '../../utils/a'

export function CopyMultipleTabs() {
  return (
    <div>
      <form 
        onChange={(e) => saveChanges(e)} 
        onSubmit={(e) => copyTabs(e)}
      >
        <input type="radio" name="format" id="markdown" /><label for="markdown">[title](url)</label>
        <input type="radio" name="format" id="base" /><label for="base">title - url</label>
        <input type="radio" name="format" id="url" /><label for="url">url</label>
        <input type="radio" name="format" id="title" /><label for="title">title</label>
        <br />
        <input type="radio" name="scope" id="single" /><label for="single">current</label>
        <input type="radio" name="scope" id="all" /><label for="all">all</label>
        <input type="radio" name="scope" id="leftward" /><label for="leftward">leftwards</label>
        <input type="radio" name="scope" id="rightward" /><label for="rightward">rightwards</label>
        <br />
        <button type="submit" tabindex="6">Copy</button>
      </form>
    </div>
  )
}
