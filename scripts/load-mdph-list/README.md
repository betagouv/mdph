Loading MDPH list
================================================

## Run Extract & Transform script

`node .`

## Load the result json

`mongoimport --db impact --collection mdphs --jsonArray --file tmp_mdphs.json`

## Add a MDPH to blacklist

Edit value of `zipCodeBlacklist` in index.js

## Update the url of the source json

Edit value of `url` in index.js
