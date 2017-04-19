Loading MDPH list
================================================

## Run Extranct & Transform script

`node .`

## Load the list

`mongoimport --db impact --collection mdphs --jsonArray --file tmp_mdphs.json`

## Add a MDP to blacklist

Edit value of `zipCodeBlacklist` in index.js

## Update the url of the sorce json

Edit value of `url` in index.js
