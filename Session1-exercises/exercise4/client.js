const http = require("http");

function requests() {
    for (let i=0; i<10; i++) {
        const result = http.get("http://localhost:8000");
        console.log(i);
    }
}

requests();