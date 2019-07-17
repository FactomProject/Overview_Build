#!/bin/bash

git checkout this_is_the_real_local
sudo apt-get install npm
npm install
#ssh -D 8125 -C -N -f manager
node server.js &
npm run start &

