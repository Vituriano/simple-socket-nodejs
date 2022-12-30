const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(4000, '127.0.0.1', () => {
    client.on('data', data => {
        console.log(data.toString());
    });

    rl.addListener('line', line => {
        readline.moveCursor(process.stdout,0,-1);
        readline.clearScreenDown(process.stdout);
        client.write(line);
    });
})