const Lookup = {
    DataTypes: [
        { dataFormat:"md", description:"Markdown" },
        { dataFormat:"title", description:"Title Only" },
        { dataFormat:"url", description:"URL Only" },
	]
};

function isImage(url){
	return (url.indexOf('.jpg') > -1 || url.indexOf('.png') > -1);
}

// dataFormat - md / title / url
// dataAction - current / all / all to the right
function doCopy(dataFormat, dataAction){

    let options = {currentWindow:true};
	if (dataAction == 'single'){
		options['active'] = true;
	}

    let format = 'text/plain';
    let output = '';

    chrome.tabs.query(options, (tabs)=>{
        for (let i=0; i < tabs.length; i++){
			let buffer = 'ERROR - buffer was never overwritten by tabTitle or tabUrl';
			let tabTitle = tabs[i].title;
			let tabUrl = tabs[i].url;

			// remove leading "notification counts" that websites have started to add, see: https://www.youtube.com/watch?v=bV0QNuhN9fU&t=64s
			let matches = tabTitle.match(/^(\([0-9]+\) )?(.*)$/);			
			if (matches) {
				tabTitle = matches[2];
			}

			if (dataFormat == 'md') {
				let prefix = '';
				if (isImage(tabUrl)){
					prefix = '!';
				}
				buffer = prefix + '[' + tabTitle + '](' + tabUrl + ')';
			}
            else if (dataFormat == 'title') {
				buffer = tabTitle;
			}
			else if (dataFormat == 'url') {
				buffer = tabUrl;
			}

			output += buffer;
			if (tabs.length > 1){
				output += '\n';
			}
		}

    });
}