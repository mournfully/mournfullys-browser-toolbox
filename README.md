# monolithic-chrome-extension
[OpenMultipleURLs](https://github.com/htrinter/Open-Multiple-URLs) dev environment was rather interesting. So, I've been slowly looking at their configs and replicating pieces of it here.

When redoing CopyCat - I want these schemes
- Copy Markdown
- Copy URLs
With these options
- Copy
- Copy all tabs
- Copy tabs to the right

```shell
docker-compose up
docker-compose up --force

# see: https://www.digitalocean.com/community/tutorials/how-to-use-docker-exec-to-run-commands-in-a-docker-container
docker exec -it mournfuly-extension sh
```

By the way, `node_modules` and `.parcel-cache` are meant to look empty because their contents are inside a docker volume.
