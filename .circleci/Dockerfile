FROM node:6

#=============
# App packages
#=============
RUN apt-get update && apt-get install -y \
  pdftk \
  imagemagick \
  qpdf

#====================
# Fix for npm-run-all
#====================
RUN ln -s /usr/local/bin/yarn /bin/yarn.js

#============
# Install PM2
#============
RUN npm install pm2@latest -g
