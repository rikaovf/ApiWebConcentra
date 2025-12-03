const net = require('net');

function sendToHarbour(host, port, message) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();

        client.connect(port, host, () => {
            const requisicao = JSON.stringify(message) + '\r\n';
            client.write(requisicao);
        });


        client.on('ready', () => {
            console.error('Socket pronto para enviar requisição.');
        });        
        
        client.on('data', (data) => {
            client.destroy();
            resolve(data.toString())
        });

        client.on('error', (err) => {
            reject(err)
        });

        client.on('close', () => {
            console.log('Conexão encerrada');
        });
    });
}

module.exports = sendToHarbour;
    