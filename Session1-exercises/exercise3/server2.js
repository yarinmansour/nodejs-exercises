const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) {
    cluster.fork({workerId: i});
  }

} else {
    http.createServer((req, res) => {
    console.log('[WORKER ' + process.env.workerId + '] request: ' + req.url);
    sleep(2000);
    res.end("Request Ended");
  }).listen(8000);
}

function sleep(ms) { // node.js >= 9.3  blocks event loop
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

