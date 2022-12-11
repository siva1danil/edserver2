const Net = require('net');
const GameSession = require('../Core/GameSession');
const Util = require('../Util/Util');

class GameServer {
    database; bind;
    server;
    sessions = [];

    constructor(database, bind) {
        this.database = database;
        this.bind = bind;
        this.server = Net.createServer(socket => this.connection(socket));
    }

    async start() {
        return new Promise((resolve, reject) => {
            this.server.once('listening', () => {
                this.server.removeAllListeners('error');
                resolve(null);
            });
            this.server.once('error', () => {
                this.server.removeAllListeners('listening');
                reject();
            });
            this.server.listen(...Util.ipport(this.bind).reverse());
        });
    }

    async stop() {
        for(let session of this.sessions)
            session.kick('Server closed');
        return new Promise(resolve => this.server.close(() => resolve(null)));
    }

    /* */

    connection(socket) {
        let session = new GameSession(this.database, socket);
        this.sessions.push(session);
        session.on('close', () => {
            this.sessions.splice(this.sessions.indexOf(session), 1);
            console.log('Closed connection, total:', this.sessions.length);
        });
        console.log('Opened connection, total:', this.sessions.length);
    }
}

module.exports = GameServer;