# configure zerotier nodes remotely
[![Node.js CI](https://github.com/laduke/joiner/actions/workflows/node.yml/badge.svg)](https://github.com/laduke/joiner/actions/workflows/node.yml)

Get a list of zerotier networks from remote urls, join them, and leave any other networks. Keep your device in sync without remembering all those network ids. 

The only flags now are --file, --url, --tokenPath, --watch

You can use multiple --file and --url flags at once.

- `npx @laduke/joiner --url http://example.com/work-networks.json --file ./home-networks.json --file test-networks.json`

You can provide networks on stdin

- `echo "[{\"id\": \"1234123412341234\" }]" | npx @laduke/joiner`

See verbose more logs with env var

- `LOG_LEVEL=debug npx @laduke/joiner`

- `--watch<=5000>` will poll all files and urls every x ms for new config

json format for now:

example.com/work-networks.json
``` json

{
  "networks": [{ "id": "2222222222222222", "allowDNS": true }, { "id": "4444444444444444" }]
}
```


# todo
- [x] github action tests
- [x] linter,formatter
- [x] refarcter
- [x] local file config
- [x] accept stdin
- [x] publish
- [ ] better error messages
- [ ] handle changed settings like `allowDNS`, only works right on first join
- [ ] logging
- [ ] containerize
- [ ] systemd timer service
- [ ] macos service
- [ ] figure out a better shape for the config data
- [ ] generate config from terraform output
- [ ] port to static language

