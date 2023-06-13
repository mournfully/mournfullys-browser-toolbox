import { getUIDef } from '../common/ui';
import { reloadHandler } from './reload'

export { };

/**
 * see: https://github.com/mohamedmansour/reload-all-tabs-extension
 * perms: tabs
 */

export const init = async (): Promise<void> => {
    const ui = getUIDef()

    /* add button events */
    ui.reloadButton.addEventListener('click', async () => {
        //! console.log("reload button acknowledges");
        await reloadHandler()
    });
};

document.addEventListener('DOMContentLoaded', init);
