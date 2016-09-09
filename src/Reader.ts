

function onFileRead(error: NodeJS.ErrnoException, data: string): void {
    if (error) {
        console.log(error.message);
        return;
    }
}

