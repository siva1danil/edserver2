const FS = require('fs');
const Constants = require('../Constants');

class FileDatabase {
    path;
    data = [];

    constructor(path) {
        this.path = path;
        this.load();
    }

    load() {
        if(FS.existsSync(this.path))
            this.data = JSON.parse(FS.readFileSync(this.path, 'utf8'));
    }

    save() {
        FS.writeFileSync(this.path, JSON.stringify(this.data));
    }

    /* */

    async findPlayerByAid(id) {
        for(let player of this.data)
            if(player.aid == id) return JSON.parse(JSON.stringify(player));
        return null;
    }

    async findPlayerByUid(id) {
        for(let player of this.data)
            if(player.uid == id) return JSON.parse(JSON.stringify(player));
        return null;
    }

    /* */

    async createPlayer(aid) {
        let player = JSON.parse(JSON.stringify(Constants.NewPlayer));
        player.uid = Math.max(Constants.FirstUid - 1, ...this.data.map(item => item.uid)) + 1;
        player.aid = aid;
        await this.updatePlayer(player);
        return player;
    }

    async updatePlayer(player) {
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].uid == player.uid) {
                this.data[i] = JSON.parse(JSON.stringify(player));
                this.save();
                return;
            }
        }
        this.data.push(JSON.parse(JSON.stringify(player)));
        this.save();
    }
}

module.exports = FileDatabase;