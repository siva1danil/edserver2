const GameServer = require('./Server/GameServer');
const FileDatabase = require('./Core/Database/FileDatabase');
const WebServer = require('./Server/WebServer');

async function main() {
    let ip = process.env['EDSERVER2_IP'];
    let db = process.env['EDSERVER2_DB'] || 'db.json';
    let database = new FileDatabase(db);

    if(!ip) throw new Error('Please set EDSERVER2_IP environment variable to your public IP');

    let web = new WebServer(database, `0.0.0.0:9980`, `${ip}:9980`, `${ip}:9991`);
    let game = new GameServer(database, '0.0.0.0:9991');

    await Promise.all([
        web.start().then(() => console.log('Main:', 'Web Server started')),
        game.start().then(() => console.log('Main:', 'Game Server started'))
    ]);

    process.once('SIGINT', async () => {
        console.log('Main:', 'Stopping...');
        await Promise.all([
            web.stop().then(() => console.log('Main:', 'Web Server stopped')),
            game.stop().then(() => console.log('Main:', 'Game Server stopped'))
        ]);
        console.log('Main:', 'Stopped');
    });
}

main();