#!/bin/bash


cd ~/go/src/github.com/FactomProject/factom-node-monitoring-tool
ssh -D 8125 -C -N -f manager
node server.js &
npm run start &

