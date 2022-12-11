const GamePacketHandler = require('../Core/GamePacketHandler');
const Protocol = require('../Core/Protocol');
const MsgHead = require('../Protocol/MsgHead');

class PacketDecoder {
    static decode(buffer) {
        /** @type {any} */ 
        let packet = Protocol.Packet.decode(buffer);
        
        switch(packet.msgType) {
            case MsgHead.MsgIdC2SLogin:
                return { id: packet.msgType, handler: GamePacketHandler.login, data: Protocol.LoginRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SHeartBeat:
                return { id: packet.msgType, handler: GamePacketHandler.heartbeat, data: Protocol.HeartBeatRequest.decode(packet.body) };
            // case MsgHead.MsgIdC2SSetRoundBeginFlow:
            //     return { id: packet.msgType, handler: null, data: Protocol.SetRoundBeginFlow.decode(packet.body) };
            // case MsgHead.MsgIdC2SSetRoundFlow:
            //     return { id: packet.msgType, handler: null, data: Protocol.SetRoundFlow.decode(packet.body) };
            // case MsgHead.MsgIdC2SAddflag:
                // return { id: packet.msgType, handler: GamePacketHandler.addFlag, data: Protocol.AddFlag.decode(packet.body) };
            case MsgHead.MsgIdC2SSetNickname:
                return { id: packet.msgType, handler: GamePacketHandler.setNickname, data: Protocol.NickName.decode(packet.body) };
            // case MsgHead.MsgIdC2SUnlockingitem:
            //     return { id: packet.msgType, handler: null, data: Protocol.UnlockingItemRequest.decode(packet.body) };
            // case MsgHead.MsgIdC2SSetShortinfo:
            //     return { id: packet.msgType, handler: null, data: Protocol.SetShortInfoRequest.decode(packet.body) };
            // case MsgHead.MsgIdC2SCostdiamond:
            //     return { id: packet.msgType, handler: null, data: Protocol.CostDiamond.decode(packet.body) };
            case MsgHead.MsgIdC2SOpenPackageSlot:
                return { id: packet.msgType, handler: GamePacketHandler.unlockPackageSlot, data: Protocol.OpenPackageSlotRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SGetPackagePoint:
                return { id: packet.msgType, handler: GamePacketHandler.getMana, data: Protocol.GetPackagePointRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SGetitem:
                return { id: packet.msgType, handler: GamePacketHandler.getItem, data: Protocol.GetItemRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SGetElementEnergy:
                return { id: packet.msgType, handler: GamePacketHandler.getElementEnergy, data: Protocol.GetElementEnergy.decode(packet.body) };
            // case MsgHead.MsgIdC2SGetSkillrecipe:
            //     return { id: packet.msgType, handler: null, data: Protocol.GetSkillRecipeRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SGetPackage:
                return { id: packet.msgType, handler: GamePacketHandler.getPackage, data: Protocol.GetPackageRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SGetStoryLevelReward:
                return { id: packet.msgType, handler: GamePacketHandler.getStoryLevelReward, data: Protocol.GetStoryLevelRewardRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SSetStoryLevel:
                return { id: packet.msgType, handler: GamePacketHandler.setStoryLevel, data: Protocol.SetStoryLevel.decode(packet.body) };
            case MsgHead.MsgIdC2SEquipitem:
                return { id: packet.msgType, handler: GamePacketHandler.equipItem, data: Protocol.EquipItemRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SOpenPackage:
                return { id: packet.msgType, handler: GamePacketHandler.openPackage, data: Protocol.OpenPackageRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SDailySignReward:
                return { id: packet.msgType, handler: GamePacketHandler.getDailyReward, data: Protocol.GetDailySignReward.decode(packet.body) };
            case MsgHead.MsgIdC2SUnlockeditem:
                return { id: packet.msgType, handler: GamePacketHandler.getUnlockedItem, data: Protocol.UnlockedItemRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SUnlockrole:
                return { id: packet.msgType, handler: GamePacketHandler.unlockRole, data: Protocol.UnlockRoleRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SFreeDiamond:
                return { id: packet.msgType, handler: GamePacketHandler.freeDiamond, data: Protocol.FreeDiamondRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SChangerole:
                return { id: packet.msgType, handler: GamePacketHandler.changeRole, data: Protocol.ChangeRoleRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SRevive:
                return { id: packet.msgType, handler: GamePacketHandler.revive, data: Protocol.ReviveRequest.decode(packet.body) };
            case MsgHead.MsgIdC2SBless:
                return { id: packet.msgType, handler: GamePacketHandler.bless, data: Protocol.BlessRequest.decode(packet.body) };
            default:
                return { id: packet.msgType, handler: () => console.log(`UnknownPacket<${packet.msgType}> = ${packet.body.toString('hex')}`), data: {} };
        }
    }
}

module.exports = PacketDecoder