const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const handleConnection = socket => {
    socket.on('end', () => {
        console.log(" ----- Conexão perdida -----");
    });
    socket.on('data', data => {
        console.log(`cliente: $${data.toString()}`);
        console.log("--------")
    });
    rl.addListener('line', line => {
        socket.write(line);
        console.log("--------")
    });
}

const server = net.createServer(handleConnection);
server.listen(4000, "127.0.0.1");