# monolithic-chrome-extension

> **NOTE**: this extension is not meant for the chrome webstore as it violates their [Extensions quality guidelines](https://developer.chrome.com/docs/extensions/mv3/single_purpose/), because this extension does not have a narrow focus area or purpose.

### thoughts
*There's a few `chrome` api calls, that I haven't managed to replace with `browser` from `webextension-polyfill`. And, maybe a status indicator for how many tabs will be copied - like what open-tabs has.*

*Maybe I should break up copy.ts into multiple files. For example, formatInput() should probably be it's own file. Especially when you consider that extract.ts is already it's own file and it's even got less lines.*

*There's also an excessive amount of semicolons between open and copy tabs. Oh yes, I'm also missing proper tests*

### open multiple tabs
[OpenMultipleURLs](https://github.com/htrinter/Open-Multiple-URLs) dev environment was rather interesting. So, I've been slowly looking at their configs and replicating pieces of it here. I wonder how I could use docker here...

### copy multiple tabs
- [x] When redoing [CopyCat](https://github.com/kiichi/QuickCopyTitleAndURL). I want the following schemes: Copy Markdown, Copy URLs, and Copy Titles
- [x] With these options: Copy, Copy all tabs, and Copy tabs to the right

### reload multiple tabs
I just want [Reload all Tabs Extension](https://github.com/mohamedmansour/reload-all-tabs-extension)'s `Reload all tabs in current window` feature and nothing else.

### possible future ideas
- [ ] I wonder if I could easily integrate [Youtube NonStop](https://github.com/lawfx/YoutubeNonStop) into what I already have.

- [ ] I want [enchanced-github](https://github.com/softvar/enhanced-github)'s ability to show each repo's size in the sidebar. Besides, I really hate how slow it can be and how it shows each files size...

- [x] And there was this browser some youtuber was shilling, and they kept going on and on about how their browser would automatically pause their music when a video was being played and would resume afterwards. I wonder if I could have that but from a chrome extension...

### building from source
```shell
git clone https://mournfully/chrome-extension
cd chrome-extension
docker-compose up
# docker-compose up -d --force-recreate

docker exec -it mournfuly-extension sh
# or attach to running container with vscode's devcontainers
```

Btw, `node_modules` and `.parcel-cache` are meant to look empty because their contents are inside a docker volume.
