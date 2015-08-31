rm -rf node_modules
npm install
bower install
grunt build
pm2 startOrRestart ecosystem.json --env production
