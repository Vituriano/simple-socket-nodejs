const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(4000, '127.0.0.1', () => {
    client.on('end', () => {
        console.log(" ----- Conexão perdida -----");
    });
    client.on('data', data => {
        const str = data.toString();
        console.log(`servidor: $${data.toString()}`);
        console.log("--------")
    });
    rl.addListener('line', line => {
        client.write(line);
        console.log("--------")
    });
})