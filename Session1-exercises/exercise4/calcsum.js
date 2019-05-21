process.on("message", input => {
    sleep(2000);
    process.send(num1 + num2);
    console.log("end");
  });
  
  function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  }