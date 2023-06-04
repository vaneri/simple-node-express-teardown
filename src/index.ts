import express, { NextFunction, Request, Response } from 'express'
const { setTimeout: sleep } = require('node:timers/promises');

const app = express()
const port = 3000

let timeout = 1000;
let expRatio = 200;

let activeRequests = 0;
let totalRequests = 0;

// middleware that is specific to this router
app.use((request: Request, response: Response, next: NextFunction) => {
    activeRequests++;
    totalRequests++;
    next()
});

app.get('/', async (req: Request, res: Response) => {
    expRatio += 200;
    timeout += expRatio;
    await setTimeout(() => {
        activeRequests--;
        console.log(`request ${timeout}`)
        res.send('Hello World!');
    }, timeout);
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


// teardown waiting that all the request are finished
process.on('SIGTERM', async () => {
    console.error('SIGTERM signal received.');
    while (activeRequests > 0) {
        console.log(`Waiting for ${activeRequests} request to complete`);
        await sleep(1000);
    }
    console.info('Graceful shutdown done!');  
    process.exit(1);
});

setInterval(() => {

    console.log(`Active requests: ${activeRequests}`);
    console.log(`Total requests: ${totalRequests}`);

}, 1000); // Display every 5 seconds