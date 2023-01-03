# monolithic-chrome-extension

> **NOTE**: this extension is not meant for the chrome webstore as it violates their [Extensions quality guidelines](https://developer.chrome.com/docs/extensions/mv3/single_purpose/), because this extension does not have a narrow focus area or purpose.

[OpenMultipleURLs](https://github.com/htrinter/Open-Multiple-URLs) dev environment was rather interesting. So, I've been slowly looking at their configs and replicating pieces of it here. I wonder how I could use docker here...

When redoing [CopyCat](https://github.com/kiichi/QuickCopyTitleAndURL) - I want these schemes:
- Copy Markdown
- Copy URLs
- Copy Titles
With these options:
- Copy
- Copy all tabs
- Copy tabs to the right

I want [enchanced-github](https://github.com/softvar/enhanced-github)'s ability to show each repo's size in the sidebar. Besides, I really hate how slow it can be and how it shows each files size...

---

```shell
docker-compose up
docker-compose up --force

# see: https://www.digitalocean.com/community/tutorials/how-to-use-docker-exec-to-run-commands-in-a-docker-container
docker exec -it mournfuly-extension sh
```

By the way, `node_modules` and `.parcel-cache` are meant to look empty because their contents are inside a docker volume.
