import { getUIDef, UIDef } from '../common/ui';
import { getStoredOptions, StorageKey, storeValue } from '../common/storage';

export { };

function addEventListeners(ui: UIDef, query: string) {
    // see: https://stackoverflow.com/questions/58606047/how-to-use-on-addeventlistener-on-radio-button-in-plain-javascript
    
    let matches = ui.copyForm.querySelectorAll(query);
    for (let i = 0; i < matches.length; i++) {
        matches[i].addEventListener("change", function() {
        let val = this.value;
            console.log(val);
        });
    }
}

export const init = async (): Promise<void> => {
    const ui = getUIDef();

    /* restore options */
    const options = await getStoredOptions();
    ui.txtArea.value = options.txt;

    /* add button events */
    ui.copyForm.addEventListener('submit', () => {
        const data = new FormData(ui.copyForm)
        let output: string;
        for (const entry of data) {
            output = `${output}${entry[0]}=${entry[1]}\r`;
        }
        console.log(output);
        // format=urls&copy=all
    });
    
    
    addEventListeners(ui, "input[name=\"format\"]");
    addEventListeners(ui, "input[name=\"action\"]");
};

document.addEventListener('DOMContentLoaded', init);
