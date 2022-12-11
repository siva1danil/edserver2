
const Http = require('http');
const FS = require('fs');
const Path = require('path');
const Util = require('../Util/Util');

class FacebookLoginServer {
    bind;
    server;

    constructor(bind) {
        this.bind = bind;
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
        let path = Path.join(__dirname, '../../assets/login.html');
        if(FS.existsSync(path))
            res.end(FS.readFileSync(path, 'utf8'));
        else
            res.end('Server Error: Login page not found');
    }
}

module.exports = FacebookLoginServer;