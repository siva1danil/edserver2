// @ts-nocheck
const Protocol = require('../Core/Protocol');
const MsgHead = require('../Protocol/MsgHead');

class PacketEncoder {
    static #LengthPrefix(buffer) {
        let length = Buffer.alloc(2);
        length.writeUInt16BE(buffer.length);
        return Buffer.concat([ length, buffer ]);
    }

    static LoginResponse(retCode, gameInfo, mailTitleList, realName, roomAddr) {
        let body = Protocol.LoginResponse.encode({ retCode, gameInfo, mailTitleList, realName, roomAddr }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CLogin, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static HeartBeatResponse(ping) {
        let body = Protocol.HeartBeatResponse.encode({ ping }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CHeartBeat, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static UnlockingItemResponse(retCode, slot, itemId, startTime) {
        let body = Protocol.UnlockingItemResponse.encode({ retCode, unlockingItem: { slot, itemId, startTime } }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CUnlockingitem, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static OpenPackageSlotResponse(retCode, slot) {
        let body = Protocol.OpenPackageSlotResponse.encode({ retCode, slot }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2COpenPackageSlot, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static GetPackagePointResponse(pointInfo) {
        let body = Protocol.GetPackagePointResponse.encode({ pointInfo }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CGetPackagePoint, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static GetItemResponse(retCode, itemId, lockType) {
        let body = Protocol.GetItemResponse.encode({ retCode, itemId, lockType }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CGetitem, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static GetSkillRecipeRequest(retCode, skillId) {
        let body = Protocol.GetItemResponse.encode({ retCode, skillId }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CGetSkillrecipe, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static GetPackageResponse(packageList) {
        let body = Protocol.GetPackageResponse.encode({ packageList }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CGetPackage, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static GetStoryLevelRewardResponse(retCode, level) {
        let body = Protocol.GetStoryLevelRewardResponse.encode({ retCode, level }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CGetStoryLevelReward, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static ElementEnergyNotify(elementEnergyCount) {
        let body = Protocol.ElementEnergyNotify.encode({ elementEnergyCount }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CNotifyElementEnergy, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static EquipItemResponse(retCode, roleId, slot, itemId, replaceItemId) {
        let body = Protocol.EquipItemResponse.encode({ retCode, roleId, slot, itemId, replaceItemId }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CEquipitem, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static OpenPackageResponse(retCode, openType, rewards, itemId, itemSlot) {
        let body = Protocol.OpenPackageResponse.encode({ retCode, openType, rewards, itemId, itemSlot }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2COpenPackage, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static GetDailySignRewardResponse(retCode, rewardDay, type, rewardId, rewardNum) {
        let body = Protocol.GetDailySignRewardResponse.encode({ retCode, rewardDay, type, rewardId, rewardNum }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CDailySignReward, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static DiamondNotify(diamondCharge, diamondReward) {
        let body = Protocol.DiamondNotify.encode({ diamondCharge, diamondReward }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CNotifyDiamond, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static NotifyUpdateItemInfo(items) {
        let body = Protocol.HonorRewardNotify.encode({ items }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CNotifyUpdateIteminfo, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static NotifyIdipBan(title, msg, traceId, beginTime, endTime) {
        let body = Protocol.IDIPBanNotify.encode({ title, msg, traceId, beginTime, endTime }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CNotifyIdipBan, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static NotifyIdipRemind(title, msg, traceId) {
        let body = Protocol.IDIPRemindNotify.encode({ title, msg, traceId }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CNotifyIdipRemind, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static UnlockedItemResponse(retCode, itemId, costNum) {
        let body = Protocol.UnlockedItemResponse.encode({ retCode, itemId, costNum }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CUnlockeditem, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static NotifyCrashClient() {
        let body = Buffer.alloc(0);
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CNotifyCrashClient, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static FreeDiamondResponse() {
        let body = Buffer.alloc(0);
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CFreeDiamond, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static UnlockRoleResponse(retCode, roleId, costNum) {
        let body = Protocol.UnlockRoleResponse.encode({ retCode, roleId, costNum }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CUnlockrole, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static ChangeRoleResponse(retCode, roleId) {
        let body = Protocol.ChangeRoleResponse.encode({ retCode, roleId }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CChangerole, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static ReviveResponse(retCode, reviveType, uid, costNum) {
        let body = Protocol.ReviveResponse.encode({ retCode, reviveType, uid, costNum }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CRevive, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static AddFlagResponse(flag) {
        let body = Protocol.AddFlag.encode({ flag }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CAddflag, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static BlessResponse(retCode, blessId, buffIds, isAds) {
        let body = Protocol.BlessResponse.encode({ retCode, blessId, buffIds, isAds }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CBless, body }).finish();
        return this.#LengthPrefix(packet);
    }

    static MealTicket(retCode, mealTicketNum) {
        let body = Protocol.MealTicketResponse.encode({ retCode, mealTicketNum }).finish();
        let packet = Protocol.Packet.encode({ msgType: MsgHead.MsgIdS2CMealTicket, body }).finish();
        return this.#LengthPrefix(packet);
    }
}

module.exports = PacketEncoder;