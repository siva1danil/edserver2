const Constants = require('../Constants');

class MemoryDatabase {
    data = [];
    
    constructor() {
        //
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
        for(let i = 0; i < this.data.length; i++)
            if(this.data[i].uid == player.uid)
                return this.data[i] = JSON.parse(JSON.stringify(player));
        this.data.push(JSON.parse(JSON.stringify(player)));
    }
}

module.exports = MemoryDatabase;