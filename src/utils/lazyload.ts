export function init(): void { 
	document.title = '[' + window.location.hash .substr(1) .replace('http://', '') .replace('https://', '') + ']'

	window.addEventListener('focus', () => {
		window.location.replace(window.location.hash.substr(1)) 
	}, false)
}

init()
