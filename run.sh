#!/bin/bash

git checkout Clay
sudo apt-get install npm
npm install
ssh -D 8125 -C -N -f manager
node server.js &
npm run start &

