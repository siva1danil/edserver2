const FacebookLoginServer = require('./Server/FacebookLoginServer');
const VersionServer = require('./Server/VersionServer');
const AuthServer = require('./Server/AuthServer');
const GameServer = require('./Server/GameServer');
const FileDatabase = require('./Core/Database/FileDatabase');

async function main() {
    let ip = process.env['EDSERVER2_IP'];
    let db = process.env['EDSERVER2_DB'] || 'db.json';
    let database = new FileDatabase(db);

    if(!ip) throw new Error('Please set EDSERVER2_IP environment varible to your public IP');

    let game = new GameServer(database, '0.0.0.0:9991');
    let auth = new AuthServer(database, `0.0.0.0:9988`, `${ip}:9991`);
    let version = new VersionServer(`0.0.0.0:9980`, `${ip}:9988`);
    let facebook = new FacebookLoginServer('0.0.0.0:9981');

    await Promise.all([
        facebook.start().then(() => console.log('Main:', 'Facebook Auth Server started')),
        version.start().then(() => console.log('Main:', 'Version Server started')),
        auth.start().then(() => console.log('Main:', 'Auth Server started')),
        game.start().then(() => console.log('Main:', 'Game Server started'))
    ]);

    process.once('SIGINT', async () => {
        console.log('Main:', 'Stopping...');
        await Promise.all([
            facebook.stop().then(() => console.log('Main:', 'Facebook Auth Server stopped')),
            version.stop().then(() => console.log('Main:', 'Version Server stopped')),
            auth.stop().then(() => console.log('Main:', 'Auth Server stopped')),
            game.stop().then(() => console.log('Main:', 'Game Server stopped'))
        ]);
        console.log('Main:', 'Stopped');
    });
}

main();