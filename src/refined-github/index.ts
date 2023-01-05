import { getStoredOptions, StorageKey, storeValue } from '../common/storage';
import { getUIDef, UIDef } from '../common/ui';
import { debounce } from 'ts-debounce';

export { };

const SAVE_INPUT_DEBOUNCE_TIME_MS = 100;

/**
 * see: https://github.com/refined-github/refined-github
 * perms: tabs, storage
 */

const saveInput = async (ui: UIDef): Promise<void> => {
    if (ui.urlInputText) {
        // ^ will evaluate to true if value is not: 
        //  null, undefined, NaN, empty string (""), 0, false,  
        await storeValue<string>(StorageKey.urlInput, ui.urlInputText.value);
    }
  };
const debouncedSaveInput = debounce(
    saveInput,
    SAVE_INPUT_DEBOUNCE_TIME_MS
);

async function openUrlInput(input: string) {
    chrome.tabs.create({ url: input });
}

export const init = async (): Promise<void> => {
    const ui = getUIDef()

    /* restore options */
    const options = await getStoredOptions();
    ui.urlInputText.value = options.urlInput;

    /* add text input events */
    ui.urlInputText.addEventListener('input', () => {
        debouncedSaveInput(ui);
    });

    /* add button events */
    ui.urlInputButton.addEventListener('click', async () => {
        await openUrlInput(ui.urlInputText.value);
    });
};

document.addEventListener('DOMContentLoaded', init);
