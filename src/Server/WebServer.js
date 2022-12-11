const Http = require('http');
const Path = require('path');
const FS = require('fs');
const BodyReader = require('../Util/BodyReader');
const Util = require('../Util/Util');

class WebServer {
    database; bind_ip; self_ip; game_ip;
    server;

    constructor(database, bind_ip, self_ip, game_ip) {
        this.database = database;
        this.bind_ip = bind_ip;
        this.self_ip = self_ip;
        this.game_ip = game_ip;
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
            this.server.listen(...Util.ipport(this.bind_ip).reverse());
        });
    }

    async stop() {
        return new Promise(resolve => this.server.close(() => resolve(null)));
    }

    /* */

    connection(req, res) {
        console.log(`WebServer | ${req.socket.remoteAddress} requested ${req.url}`);
        if(req.url.endsWith('/versions.txt')) this.connection_versions(req, res);
        else if(req.url.endsWith('/get_status')) this.connection_status(req, res);
        else if(req.url.endsWith('/login')) this.connection_login(req, res);
        else if(req.url.endsWith('/auth')) this.connection_auth(req, res);
        else res.end();
    }

    connection_versions(req, res) { // TODO: Move to ObjectCodec
        let response = JSON.stringify([
            {
                version: 0,
                version_type: 0,
                latest_version: 500,
                update_url: 'https://discord.gg/kn7nD66Ggs',
                res_version: 0,
                res_url: 'http://elemental.us-ca.ufileos.com/en/android/res/',
                server_url: `http://${this.self_ip}/`,
                open_ads: 1,
                open_cdkey: 1,
                open_share: 0,
                open_charge: 1,
                open_limit: 0,
                open_limit_desc: '',
                cdkey_url: '',
                code_url: '',
                qa_login_url: '',
                qa_charge_url: '',
                qa_pause_url: '',
                follow_url: '',
                main_jump_url: '',
                pause_jump_url: '',
                question_jump_url: '',
                param_value_1: '1',
                param_value_2: '5500',
                param_value_3: '',
                open_login_fb: '1',
                open_login_ap: '0',
                open_login_google: '0',
                open_login_guest: '0',
                notice_type: 0,
                notice_content: 'Maintainance...',
                limit_accounts: '',
                super_accounts: '1'
            }
        ]);
        res.end(response);
    }

    connection_status(req, res) {
        let response = JSON.stringify({
            Status: 0,
            NoticeType: 0,
            NoticeContent: ''
        });
        res.end(response);
    }

    async connection_login(req, res) {
        let data = await BodyReader.read(req, 'json');

        let player = await this.database.findPlayerByAid(data.Acc) || await this.database.createPlayer(data.Acc);
        
        res.end(JSON.stringify({
            Status: 0,
            AccountId: player.uid,
            Token: player.aid,
            Addr: { Ip: Util.ipport(this.game_ip)[0], Port: Util.ipport(this.game_ip)[1] }
        }));
    }

    connection_auth(req, res) {
        let path = Path.join(__dirname, '../../assets/login.html');
        if(FS.existsSync(path))
            res.end(FS.readFileSync(path, 'utf8'));
        else
            res.end('Server Error: Login page not found');
    }
}

module.exports = WebServer;