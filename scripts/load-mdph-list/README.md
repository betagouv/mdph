# Loading MDPH list

## Production

### Run Extract & Transform script

`node .`

### Load the result json

`mongoimport --db impact --collection mdphs --jsonArray --file tmp_mdphs.json`

### Add a MDPH to blacklist

Edit value of `zipCodeBlacklist` in index.js

### Update the url of the source json

Edit value of `url` in index.js

## Development

### Load all_for_dev_mdphs.json

`mongoimport --db impact --collection mdphs --jsonArray --file all_for_dev_mdphs.json`

You may use `--drop` parameter to load the collection over your current base
