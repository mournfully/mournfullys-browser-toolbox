import { getUIDef, UIDef } from '../common/ui';
import { getStoredOptions, StorageKey, storeValue } from '../common/storage';
import { debounce } from 'ts-debounce';

export { };

export const SAVE_URL_LIST_DEBOUNCE_TIME_MS = 100;
export const UPDATE_TAB_COUNT_DEBOUNCE_TIME_MS = 50;

// const saveOptions = async (ui: UIDef, any): Promise<void> => {
//     if ()
//        await storeValue<string>(StorageKey.format, ui.copyForm.);
//     }
// };
// const debouncedSaveOptions = debounce(
//     saveOptions,
//     SAVE_URL_LIST_DEBOUNCE_TIME_MS
// );

function addEventListeners(ui: UIDef, query: string) {
    // see: https://stackoverflow.com/questions/58606047/how-to-use-on-addeventlistener-on-radio-button-in-plain-javascript
    
    let matches = ui.copyForm.querySelectorAll(query);
    for (let i = 0; i < matches.length; i++) {
        matches[i].addEventListener("change", function() {
            console.log(this.value);
            // debouncedSaveOptions(ui, this.value);
        });
        console.log(matches[i]);
    }
}

export const init = async (): Promise<void> => {
    const ui = getUIDef();

    /* restore options */
    const options = await getStoredOptions();

    // document.getElementById("rightwards").checked = true;

    /* add radio button events */
    addEventListeners(ui, "input[name=\"format\"]");
    addEventListeners(ui, "input[name=\"scope\"]");

    /* add button events */
    ui.copyButton.addEventListener('click', () => {
        console.log("click registered");
        // debouncedSaveOptions(ui);
        // debouncedUpdateTabCount(ui);
    });

};

document.addEventListener('DOMContentLoaded', init);
