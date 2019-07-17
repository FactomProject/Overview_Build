The Easy way
================

After you clone down the repo, cd into `factom-node-monitoring-tool`

Once in the repo run 
``` bash
$ npm install
```

You can modify what IPs and APIs you want to call in the `.env` file.

In one terminal run:
``` bash
$ node server.js
```

In another terminal run:
``` bash 
$ npm run start
```
^^^ that will start the client on lvh.me:3000

Changes made on the webpage will save via localStorage, so when you return you wont have to change what is diplayed.