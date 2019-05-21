const cluster = require('cluster');
const http = require('http');
const child_process = require('child_process');

if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) {
    cluster.fork({workerId: i});
  }

} else {
    http.createServer((req, res) => {
    console.log(`Server (id: ${process.env.workerId}) request...`);
    const forked = child_process.fork("./calcsum.js");
    forked.on("message", result => {
      console.log(`child process ${result}`);
      res.end(result.result.toString());
    });
    forked.send([9,9]);
  }).listen(8000);
}


