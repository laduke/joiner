# configure zerotier nodes remotely
![github action badge](https://github.com/laduke/joiner/actions/workflows/node.js.yml/badge.svg)

Get a lists of zerotier networks from remote urls, join them, leave any other networks. Keep your device in sync without remembering all those network ids. 

The only flags now are --file, --url, --tokenPath

You can use multiple --file and --url flags at once.

- `./bin.js --url http://example.com/work-networks.json --file ./home-networks.json --file test-networks.json`
- `./bin.js --file ./none.json`

json format for now:

``` json

example.com/work-networks.json
{
  "networks": [{ "id": "2222222222222222", "allowDNS": true }, { "id": "4444444444444444" }]
}
```


# todo
- [x] github action tests
- [x] linter,formatter
- [x] refarcter
- [x] local file config
- [ ] logging
- [ ] containerize
- [ ] publish
- [x] accept stdin
- [ ] package for easy install
- [ ] more readme
- [ ] systemd timer service
- [ ] macos service
- [ ] figure out a better shape for the config data
- [ ] generate config from terraform output

