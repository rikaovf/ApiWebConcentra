const net = require('net');

function sendToHarbour(reqdados) {
    host = reqdados.host
    port = reqdados.port
    message = reqdados.message
    
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        client.setTimeout(5000);
        
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

        
        client.on('timeout', () => {
            client.destroy();
            reject("Timeout ao comunicar com Harbour");
        });

        client.on('close', () => {
            console.log('Conexão encerrada');
        });
    });
}

module.exports = sendToHarbour;
    