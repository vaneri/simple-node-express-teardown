# simple-node-express-teardown
A very basic to test a gracefull shutdown on kill command

`npm install`
`npm run build`
`npm run start` 

run on port 3000

# procedure for testing (rudimentary)
1. Start the server
2. run: `artillery run __tests__/test.yml`
3. kill the node process `kill pid`

The server will wait until all the requests are terminated to properly shutdown
