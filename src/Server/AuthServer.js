
const Http = require('http');
const BodyReader = require('../Util/BodyReader');
const Util = require('../Util/Util');

class AuthServer {
    database; bind; redirect;
    server;

    constructor(database, bind, redirect) {
        this.database = database;
        this.bind = bind;
        this.redirect = redirect;
        this.server = Http.createServer((req, res) => this.connection(req, res));
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
        return new Promise(resolve => this.server.close(() => resolve(null)));
    }

    /* */

    connection(req, res) {
        console.log('AuthServer:', `Connection from ${req.socket.remoteAddress}`);
        if(req.url == '/get_status') this.connection_status(req, res);
        else if(req.url == '/login') this.connection_login(req, res);
        else res.end();
    }

    connection_status(req, res) {
        console.log('AuthServer:', `Status request from ${req.socket.remoteAddress}`);
        let response = JSON.stringify({
            Status: 0,
            NoticeType: 0,
            NoticeContent: ''
        });
        res.end(response);
    }

    async connection_login(req, res) {
        console.log('AuthServer:', `Login request from ${req.socket.remoteAddress}`);

        let data = await BodyReader.read(req, 'json');

        let player = await this.database.findPlayerByAid(data.Acc) || await this.database.createPlayer(data.Acc);
        
        res.end(JSON.stringify({
            Status: 0,
            AccountId: player.uid,
            Token: player.aid,
            Addr: { Ip: Util.ipport(this.redirect)[0], Port: Util.ipport(this.redirect)[1] }
        }));
    }
}

module.exports = AuthServer;