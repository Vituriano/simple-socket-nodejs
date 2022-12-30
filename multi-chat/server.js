const net = require('net');

var clients = [];

const handleConnection = socket => {
    console.log("----- Nova conexão -----");

    socket.write('> Informe o seu nome: ');
    socket.name = `${socket.remoteAddress} : ${socket.remotePort}`; 
    clients.push(socket);

    socket.on('data', data => {
        let isNamePhase = clients.some((client) => {
            if (client.name === socket.name &&
                socket.name === socket.remoteAddress + ":" + socket.remotePort) {
                return true;
            }
            return false;
        });

        if (isNamePhase) {
            clients.map((client) => {
                if (client.name === socket.name) {
                    socket.name = data.toString();
                    client.name = socket.name;
                }
            });
            socket.write(`----- Olá ${socket.name}! -----`);
        } else {
            broadcast(`${socket.name} : ${data.toString()}`);
        }
    });

    socket.on('end', () => {
        console.log(" ----- Conexão perdida -----");
    });
}

function broadcast(message) {
    clients.forEach(function (client) {
        client.write(message);
    });
}

const server = net.createServer(handleConnection);
server.listen(4000, "127.0.0.1");