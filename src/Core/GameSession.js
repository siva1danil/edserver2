const EventEmitter = require('events');
const PacketEncoder = require('../Util/PacketEncoder');

const Constants = require('./Constants');
const PacketDecoder = require('../Util/PacketDecoder');

// TODO: Lock active player data modification
class GameSession extends EventEmitter {
    database; socket;

    buffer = Buffer.alloc(0); player = null;

    constructor(database, socket) {
        super();
        this.database = database;
        this.socket = socket;
        socket.setTimeout(Constants.SocketTimeout);
        socket.on('data', data => this.process(data));
        socket.on('timeout', () => socket.end())
        socket.on('error', () => {});
        socket.on('close', () => this.close());
    }

    process(data) {
        data = Buffer.concat([ this.buffer, data ]);

        while(data.length >= 2) {
            let size = data.readUInt16BE();
            if(data.length < size + 2) break;
            this.packet(data.subarray(2, size + 2));
            data = data.subarray(size + 2);
        }

        this.buffer = data;
    }

    packet(data) {
        try {
            let packet = PacketDecoder.decode(data);
            packet.handler(this, packet.data);
        } catch(error) {
            this.alert('Error at packet handler! Please report this to developer:\n\n' + error.stack);
            console.trace(error);
        }
    }

    async close() {
        this.socket.destroy();
        if(this.player) await this.database.updatePlayer(this.player);
        this.emit('close');
    }

    /* */

    alert(message) {
        let packet = PacketEncoder.NotifyIdipRemind('', message, '');
        this.socket.write(packet);
    }

    kick(message = null) {
        let packet = message == null
            ? PacketEncoder.NotifyCrashClient()
            : PacketEncoder.NotifyIdipBan('', message, '', 0, 0);
        this.socket.write(packet);
    }
}

module.exports = GameSession;