
const Http = require('http');
const Util = require('../Util/Util');

class VersionServer {
    bind; redirect;
    server;

    constructor(bind, redirect) {
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
        console.log('VersionServer:', `Connection from ${req.socket.remoteAddress}`);
        if(req.url.endsWith('/versions.txt')) this.connection_versions(req, res);
        else res.end();
    }

    connection_versions(req, res) { // TODO: Move to ObjectCodec
        console.log('VersionServer:', `Version request from ${req.socket.remoteAddress}`);
        let response = JSON.stringify([
            {
                "version":0,
                "version_type":0,
                "latest_version":500,
                "update_url":"market://details?id=com.pandagames.elemental",
            //    "res_version":503,
            //    "res_url":"https://elemental-1258099256.file.myqcloud.com/android/res503/",
                "res_version":0,
                "res_url":"http://elemental.us-ca.ufileos.com/en/android/res/",
                "server_url":`http://${this.redirect}/`,
                "open_ads":1,
                "open_cdkey":1,
                "open_share":0,
                "open_charge":1,
                "open_limit":0,
                "open_limit_desc":"",
                "cdkey_url":"",
                "code_url":"",
                "qa_login_url":"",
                "qa_charge_url":"",
                "qa_pause_url":"",
                "follow_url":"",
                "main_jump_url":"",
                "pause_jump_url":"",
                "question_jump_url":"",
                "param_value_1":"1",
                "param_value_2":"5500",
                "param_value_3":"",
                "open_login_fb":"1",
                "open_login_ap":"0",
                "open_login_google":"0",
                "open_login_guest":"0",
                "notice_type":0,
                "notice_content":"Maintainance...",
                "limit_accounts":"",
                "super_accounts":"1"
            }
        ]);
        res.end(response);
    }
}

module.exports = VersionServer;