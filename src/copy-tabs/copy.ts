import browser from 'webextension-polyfill';
import ClipboardJS from 'clipboard';

// see: https://stackoverflow.com/questions/63526969/how-do-you-return-multiple-values-from-a-typescript-function
async function setupOptions(dataFormat, dataAction) {
	//! console.log("func setupOptions: input: ", dataAction);
	// Query only tabs that are in the current window aka the window that contains the code that is currently executing.
	let options = { currentWindow: true };
		
	// If true, query only the active tabs in their windows.
	if (dataAction == 'single') {
		//! console.log("single action");
		options['active'] = true;
	}

	let tabStart = 0;
	if (dataAction == 'rightward') {
		//! console.log("rightwards action");
		const currentTab = await getCurrentTab();
		//! console.log("setupOptions: currentTab:", currentTab);
		// see: https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab
		tabStart = currentTab.index + 1 // all tabs to it's right, but not itself
		//! +1 means that it'll count all tabs to the right of it, but not itself
		//! this was done to mimic 'close all tabs to the right' behaviour for consistency
		//! console.log("setupOptions: tabStart:", tabStart);
	}

	// see: https://www.w3schools.com/js/tryit.asp?filename=tryjs_object_object
	formatInput(dataFormat, options, tabStart);
}

/**
 * Copy urls/titles from tabs in current window
 * @param dataFormat - type of data format to copy e.g. "md", "title", or "url"
 * @param dataAction - action when it copies: "current", "all", or "all to the right"
 */
function formatInput(dataFormat, options, tabStart) {
	//! console.log("function formatInput acknowledges:", dataFormat, ",", options, "and", tabStart);
	let output = '';
	chrome.tabs.query(options, (tabs) => {
		for (let i = tabStart; i < tabs.length; i++) {
			//! console.log("for loop acknowledges")

			let buffer = 'ERROR - buffer was never overwritten by tabTitle or tabUrl';
			let tabTitle = tabs[i].title;
			let tabUrl = tabs[i].url;

			// remove leading "notification counts" that websites have started to add
			// see: https://www.youtube.com/watch?v=bV0QNuhN9fU&t=64s
			let matches = tabTitle.match(/^(\([0-9]+\) )?(.*)$/);
			if (matches) {
				tabTitle = matches[2];
			}

			// format each url depending on the requested data format
			if (dataFormat == 'markdown') {
				//! console.log("markdown acknowledges")
				let prefix = '';
				if (isImage(tabUrl)){
					prefix = '!';
				}
				buffer = prefix + '[' + tabTitle + '](' + tabUrl + ')';
			}
			else if (dataFormat == 'url') {
				//! console.log("url acknowledges")
				buffer = tabUrl;
			}
			else if (dataFormat == 'title') {
				//! console.log("title acknowledges")
				buffer = tabTitle;
			}

			// append working buffer to output, and if there's more than one line left start a new line
			output += buffer;
			if (tabs.length > 1) {
				output += '\n';
			}
			//! console.log("formatInput: output 1:", output); // too verbose
		}
		//! console.log("formatInput: output 2:"); // good
		//! console.log(output);
		//! return output;
		copyToClipboard(output);
	});
	//! console.log("formatInput: output 3:", output); // nothing
}

function isImage(url) {
	return (url.indexOf('.jpg') > -1 || url.indexOf('.png') > -1);
}

// see: https://github.com/zenorocha/clipboard.js/blob/master/demo/target-programmatic-copy.html
function copyToClipboard(input: string) {
	const textCopied = ClipboardJS.copy(input);
	console.log('copied!\n' + textCopied);
}

// see: https://developer.chrome.com/docs/extensions/reference/tabs/#get-the-current-tab
async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	//! 	  ↑ 'tab' will either be a 'tabs.Tab' instance or 'undefined'.
	return tab;
}

export function copyTabsHandler(dataFormat, dataAction) {
	setupOptions(dataFormat, dataAction);
	//! let object = await setupOptions(dataAction);
	//! let output = await formatInput(dataFormat, object.options, object.tabStart);
	//! console.log("formatInput: output:", output);
	//! copyToClipboard(output);
}