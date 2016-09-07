import fs = require('fs');


// csv??

function onFileRead(error: NodeJS.ErrnoException, data: string): void {
    if (error) {
        console.log(error.message);
        return;
    }
}

fs.readFile("spells.csv", "utf8", onFileRead);
