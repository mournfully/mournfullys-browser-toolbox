import { extractURLs } from './extract';
import { loadSites, URL_LINE_SPLIT_REGEX } from './load';
import { getStoredOptions, StorageKey, storeValue } from '../common/storage';
import { getUIDef, UIDef } from '../common/ui';
import { debounce } from 'ts-debounce';

export { };

export const SAVE_URL_LIST_DEBOUNCE_TIME_MS = 100;
export const UPDATE_TAB_COUNT_DEBOUNCE_TIME_MS = 50;

/**
 * see: https://github.com/htrinter/Open-Multiple-URLs
 * perms: storage
 */

const saveUrlList = async (ui: UIDef): Promise<void> => {
  if (ui.txtArea) {
    // ^ will evaluate to true if value is not: 
    //  null, undefined, NaN, empty string (""), 0, false,  
    await storeValue<string>(StorageKey.urlList, ui.txtArea.value);
  }
};
const debouncedSaveUrlList = debounce(
  saveUrlList,
  SAVE_URL_LIST_DEBOUNCE_TIME_MS
);

const updateTabCount = (ui: UIDef) => {
  let tabCount = '0';
  if (ui.txtArea.value) {
    const lines = ui.txtArea.value.split(URL_LINE_SPLIT_REGEX);
    if (lines.length <= 5000) {
      /* limit for performance reasons */
      tabCount = String(lines.filter((line) => line.trim() !== '').length);
    } else {
      tabCount = '> 5000';
    }
  }

  ui.tabCountNumber.textContent = tabCount;
  ui.tabCountTabLabel.textContent = tabCount === '1' ? 'tab' : 'tabs';
  ui.tabCount.style.visibility = tabCount === '0' ? 'visible' : 'visible';
};
const debouncedUpdateTabCount = debounce(
  updateTabCount,
  UPDATE_TAB_COUNT_DEBOUNCE_TIME_MS
);

export const init = async (): Promise<void> => {
  const ui = getUIDef();

  /* restore options */
  const options = await getStoredOptions();
  ui.txtArea.value = options.txt;

  /* add text input events */
  ui.txtArea.addEventListener('input', () => {
    debouncedSaveUrlList(ui);
    debouncedUpdateTabCount(ui);
  });

  /* add button events */
  ui.openButton.addEventListener('click', () => {
    saveUrlList(ui);
    loadSites(ui.txtArea.value);
  });
  ui.extractButton.addEventListener('click', () => {
    ui.txtArea.value = extractURLs(ui.txtArea.value);
    saveUrlList(ui);
    updateTabCount(ui);
  });

  /* update tabcount */
  updateTabCount(ui);

  /* select text in form field */
  ui.txtArea.select();
};

document.addEventListener('DOMContentLoaded', init);
