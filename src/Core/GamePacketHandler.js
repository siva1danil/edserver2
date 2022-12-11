const PacketEncoder = require('../Util/PacketEncoder');
const ObjectCodec = require('../Util/ObjectCodec');
const ErrorCode = require('../Protocol/ErrorCode');
const GameLogic = require('./GameLogic');
const PackageData = require('../Registry/PackageData');
const ItemID = require('../Registry/ItemID');
const LockType = require('../Protocol/LockType');
const AccessoryID = require('../Registry/AccessoryID');
const AccessoryData = require('../Registry/AccessoryData');
const DateTime = require('../Util/DateTime');
const StoryLevelData = require('../Registry/StoryLevelData');
const Constants = require('./Constants');
const RoleID = require('../Registry/RoleID');
const RoleData = require('../Registry/RoleData');
const ReviveType = require('../Protocol/ReviveType');
const PackageID = require('../Registry/PackageID');
const BlessID = require('../Registry/BlessID');
const BuffID = require('../Registry/BuffID');

class GamePacketHandler {
    static async login(session, data) {
        session.player = await session.database.findPlayerByAid(data.token);
        if(session.player == null)
            return session.kick(`AccountID not found: ${data.token}`);
        let response = session.player != null
            ? PacketEncoder.LoginResponse(ErrorCode.Success, ObjectCodec.encodeGameInfo(session.player))
            : PacketEncoder.LoginResponse(ErrorCode.AccNotExist);
        session.socket.write(response);
    }

    static async heartbeat(session, data) {
        let response = PacketEncoder.HeartBeatResponse(data.pong);
        session.socket.write(response);
    }

    static async addFlag(session, data) {
        if(data.flag == 0) session.player.guide.intro = true;
        else if(data.flag == 1) session.player.guide.equipment = true;
        else if(data.flag == 2) session.player.guide.equipment_overview = true;
        else if(data.flag == 3) session.player.guide.equipment_decipher = true;
        else if(data.flag == 106) session.player.guide.spells = true;
        else if(data.flag == 108) session.player.guide.spells_overview = true;
        else console.log('Unknown flag:', data.flag);
        
        let response = PacketEncoder.AddFlagResponse(data.flag);
        session.socket.write(response);
    }

    static async setNickname(session, data) {
        session.player.name = data.nickName;
    }

    static async startDecipher(session, data) {
        if(session.player.decipher.every(item => item != null)) {
            let response = PacketEncoder.UnlockingItemResponse(ErrorCode.UnlockingFull, undefined, undefined, undefined);
            session.socket.write(response);
        } else if(session.player.decipher.some(item => item == data.itemId)) {
            let response = PacketEncoder.UnlockingItemResponse(ErrorCode.ItemIdNotInTheLocked, undefined, undefined, undefined);
            session.socket.write(response);
        } else if(session.player.equipment[data.itemId] != -1) {
            let response = PacketEncoder.UnlockingItemResponse(ErrorCode.ItemIdNotInTheLocked, undefined, undefined, undefined);
            session.socket.write(response);
        } else {
            let slot = session.player.decipher[0] == null ? 0 : 1;
            let time = DateTime.unix();
            session.player.decipher[slot] = { id: data.itemId, time: time };

            let response = PacketEncoder.UnlockingItemResponse(ErrorCode.Success, slot, data.itemId, time);
            session.socket.write(response);
        }
    }

    static async equipItem(session, data) {
        if(data.itemId != 0 && (!session.player.equipment.hasOwnProperty(data.itemId) || session.player.equipment[data.itemId] == -1)) {
            let response = PacketEncoder.EquipItemResponse(ErrorCode.ItemNotUnlock, undefined, undefined, undefined, undefined);
            session.socket.write(response);
        } else if(!session.player.roles.hasOwnProperty(data.roleId) || !session.player.roles[data.roleId].unlocked || session.player.roles[data.roleId].equipment[data.slot] == -1) {
            let response = PacketEncoder.EquipItemResponse(ErrorCode.ActorEquipSlotLocked, undefined, undefined, undefined, undefined);
            session.socket.write(response);
        } else if(data.slot >= session.player.roles[data.roleId].equipment.length) {
            let response = PacketEncoder.EquipItemResponse(ErrorCode.SystemError, undefined, undefined, undefined, undefined);
            session.socket.write(response);
        } else {
            let replace = session.player.roles[data.roleId].equipment[data.slot];
            session.player.roles[data.roleId].equipment[data.slot] = data.itemId;
            let response = PacketEncoder.EquipItemResponse(ErrorCode.Success, data.roleId, data.slot, data.itemId, replace);
            session.socket.write(response);
        }
    }

    static async getMana(session) {
        session.player.mana = GameLogic.calculateMana(session.player);
        let response = PacketEncoder.GetPackagePointResponse(ObjectCodec.encodePackagePointInfo(session.player.mana));
        session.socket.write(response);
    }

    static async unlockPackageSlot(session, data) {
        if(GameLogic.getUnlockablePackageSlots(session.player).includes(data.slot)) {
            session.player.packages[data.slot - 1] = 0;
            let response = PacketEncoder.OpenPackageSlotResponse(ErrorCode.Success, data.slot);
            session.socket.write(response);
        } else {
            let response = PacketEncoder.OpenPackageSlotResponse(ErrorCode.SystemError, data.slot);
            session.socket.write(response);
        }
    }

    static async openPackage(session, data) {
        if(data.itemSlot < 1 || data.itemSlot > 12) {
            let response = PacketEncoder.OpenPackageResponse(ErrorCode.SystemError, 1, [], 0, data.itemSlot);
            session.socket.write(response);
        } else if(session.player.packages[data.itemSlot - 1] <= 0) {
            let response = PacketEncoder.OpenPackageResponse(ErrorCode.SystemError, 1, [], 0, data.itemSlot);
            session.socket.write(response);
        } else if(PackageData[session.player.packages[data.itemSlot - 1]].cost > session.player.mana) {
            let response = PacketEncoder.OpenPackageResponse(ErrorCode.SystemError, 1, [], 0, data.itemSlot);
            session.socket.write(response);
        } else {
            let id = session.player.packages[data.itemSlot - 1];
            let loot = GameLogic.generatePackageLoot(id)
                .map(row => ({ itemId: row[0], itemNum: row[1] }));
            session.player.packages[data.itemSlot - 1] = 0;
            session.player.mana = GameLogic.takeMana(session.player, PackageData[id].cost);

            let responses = [ PacketEncoder.OpenPackageResponse(ErrorCode.Success, 1, loot, 0, data.itemSlot) ];
            for(let item of loot) {
                if(item.itemId == ItemID.Gem) {
                    session.player.diamonds += item.itemNum;
                    responses.push(PacketEncoder.DiamondNotify(0, session.player.diamonds));
                } else if(item.itemId == ItemID.Energy) {
                    session.player.energy += item.itemNum;
                    responses.push(PacketEncoder.ElementEnergyNotify(session.player.energy));
                } else {
                    session.player.items[item.itemId] += item.itemNum;
                }
            }
            responses.push(
                PacketEncoder.NotifyUpdateItemInfo(Object.keys(session.player.items)
                    .map(id => ({ itemId: parseInt(id), itemNum: session.player.items[id] })
            )));
            session.socket.write(Buffer.concat(responses));
        }
    }

    static async getItem(session, data) {
        if(!Object.values(AccessoryID).includes(data.itemId)) {
            let response = PacketEncoder.GetItemResponse(ErrorCode.ItemIdError, data.itemId, data.lockType);
            session.socket.write(response);
        } else if(session.player.equipment.hasOwnProperty(data.itemId)) {
            let response = PacketEncoder.GetItemResponse(ErrorCode.ItemIdNotInTheLocked, data.itemId, data.lockType);
            session.socket.write(response);
        } else if(data.lockType == LockType.Unlocked) {
            // get item while in game
        } else {
            session.player.equipment[data.itemId] = -1;
            let response = PacketEncoder.GetItemResponse(ErrorCode.Success, data.itemId, data.lockType);
            session.socket.write(response);
        }
    }

    static async getUnlockedItem(session, data) { // TODO: what is costNum?; ads should decrease time
        let index = session.player.decipher.findIndex(item => item != null && item.id == data.itemId);
        if(index == -1) {
            let response = PacketEncoder.UnlockedItemResponse(ErrorCode.ItemIdNotInTheUnlocking, data.itemId, 0);
            session.socket.write(response);
        } else if(session.player.decipher[index].time + AccessoryData[data.itemId].time > DateTime.unix()) {
            let response = PacketEncoder.UnlockedItemResponse(ErrorCode.NotInTime, data.itemId, 0);
            session.socket.write(response);
        } else {
            session.player.decipher[index] = null;
            session.player.equipment[data.itemId] = 0;
            let response = PacketEncoder.UnlockedItemResponse(ErrorCode.Success, data.itemId, 0);
            session.socket.write(response);
        }
    }

    static async setStoryLevel(session, data) {
        if(!session.player.levels.hasOwnProperty(data.level)) {
            // Invalid level
        } else if(data.level > 1 && session.player.levels[data.level - 1].depth != StoryLevelData[data.level - 1].depth) {
            // Level not unlocked
        } else if(data.passLevel > StoryLevelData[data.level].depth) {
            // Invalid depth
        } else {
            session.player.levels[data.level].depth = data.passLevel;
        }
    }

    static async getStoryLevelReward(session, data) {
        if(!session.player.levels.hasOwnProperty(data.level)) {
            let response = PacketEncoder.GetStoryLevelRewardResponse(ErrorCode.SystemError, data.level);
            session.socket.write(response);
        } else if(session.player.levels[data.level].depth != StoryLevelData[data.level].depth) {
            let response = PacketEncoder.GetStoryLevelRewardResponse(ErrorCode.SystemError, data.level);
            session.socket.write(response);
        } else if(session.player.levels[data.level].reward) {
            let response = PacketEncoder.GetStoryLevelRewardResponse(ErrorCode.SystemError, data.level);
            session.socket.write(response);
        } else {
            session.player.levels[data.level].reward = true;
            session.player.energy += StoryLevelData[data.level].reward.energy;
            session.player.spells[StoryLevelData[data.level].reward.spell] = -1;

            let response = Buffer.concat([
                PacketEncoder.GetStoryLevelRewardResponse(ErrorCode.Success, data.level),
                PacketEncoder.ElementEnergyNotify(session.player.energy)
            ]);
            session.socket.write(response);
        }
    }

    static async freeDiamond(session) {
        if(session.player.reward.day == DateTime.day() && session.player.reward.count == 2) {
            // Already claimed
        } else if(session.player.reward.day == DateTime.day() && session.player.reward.count == 1) {
            session.player.reward.count = 2;
            session.player.diamonds += Constants.DiamondsPerReward;

            let response = Buffer.concat([
                PacketEncoder.FreeDiamondResponse(),
                PacketEncoder.DiamondNotify(0, session.player.diamonds)
            ]);
            session.socket.write(response);
        } else if(session.player.reward.day != DateTime.day()) {
            session.player.reward.day = DateTime.day();
            session.player.reward.count = 1;
            session.player.diamonds += Constants.DiamondsPerReward;

            let response = Buffer.concat([
                PacketEncoder.FreeDiamondResponse(),
                PacketEncoder.DiamondNotify(0, session.player.diamonds)
            ]);
            session.socket.write(response);
        }
    }

    static async unlockRole(session, data) {
        if(!Object.values(RoleID).includes(data.roleId)) {
            let response = PacketEncoder.UnlockRoleResponse(ErrorCode.RoleIdError, data.roleId, 0);
            session.socket.write(response);
        } else if(session.player.diamonds < RoleData[data.roleId].cost) {
            let response = PacketEncoder.UnlockRoleResponse(ErrorCode.DiamondNotEnough, data.roleId, RoleData[data.roleId]);
            session.socket.write(response);
        } else if(session.player.roles[data.roleId].unlocked) {
            let response = PacketEncoder.UnlockRoleResponse(ErrorCode.RepeatUnlockRole, data.roleId, 0);
            session.socket.write(response);
        } else {
            session.player.roles[data.roleId].unlocked = true;
            session.player.diamonds -= RoleData[data.roleId].cost;

            let response = Buffer.concat([
                PacketEncoder.UnlockRoleResponse(ErrorCode.Success, data.roleId, RoleData[data.roleId].cost),
                PacketEncoder.DiamondNotify(0, session.player.diamonds)
            ]);
            session.socket.write(response);
        }
    }

    static async changeRole(session, data) {
        if(!Object.values(RoleID).includes(data.roleId)) {
            let response = PacketEncoder.ChangeRoleResponse(ErrorCode.RoleIdError, data.roleId);
            session.socket.write(response);
        } else if(!session.player.roles[data.roleId].unlocked) {
            let response = PacketEncoder.UnlockRoleResponse(ErrorCode.ChangeRoleNoUnlock, data.roleId);
            session.socket.write(response);
        } else {
            session.player.role = data.roleId;

            let response = PacketEncoder.ChangeRoleResponse(ErrorCode.Success, data.roleId);
            session.socket.write(response);
        }
    }

    static async getDailyReward(session, data) { // TODO: implement
        if(data.type != 1) {
            // Unknown type
        } else if(session.player.login.day == DateTime.day()) {
            // Already received
        } else {
            session.player.login.day = DateTime.day();
            // Receive
        }
        // 20 gems >> PacketEncoder.GetDailySignRewardResponse(ErrorCode.Success, 1, 2, 0, 0);
        // hunter role >> PacketEncoder.UnlockRoleResponse(ErrorCode.Success, RoleID.Hunter);
    }

    static async revive(session, data) {
        if([ReviveType.Ads, ReviveType.StoryAds].includes(data.reviveType)) {
            let response = PacketEncoder.ReviveResponse(ErrorCode.Success, data.reviveType, data.uid, 0);
            session.socket.write(response);
        } else if([ReviveType.Ticket, ReviveType.TicketStory].includes(data.reviveType)) {
            // TODO: revive using tickets
        } else if([ReviveType.Diamond, ReviveType.DiamondStory].includes(data.reviveType)) {
            // TODO: revive using diamonds
        } else if(data.reviveType == ReviveType.Free) {
            // ???
        } else {
            // Invalid revive type
        }
    }

    static async getElementEnergy(session, data) {
        session.player.energy += data.itemCount;
        
        let response = PacketEncoder.ElementEnergyNotify(session.player.energy);
        session.socket.write(response);
    }

    static async getPackage(session, data) {
        if(!Object.values(PackageID).includes(data.itemId)) {
            let response = PacketEncoder.GetPackageResponse(session.player.packages);
            session.socket.write(response);
        } else {
            session.player.packages = GameLogic.addPackage(session.player.packages, data.itemId);

            let response = PacketEncoder.GetPackageResponse(session.player.packages);
            session.socket.write(response);
        }
    }

    static async bless(session, data) {
        if(!Array.isArray(data.buffIds) || data.buffIds.some(item => !Object.values(BuffID).includes(item))) {
            //TODO: remove
            session.alert(`Error: BuffID[${data.buffIds.join(',')}] is not present in Registry. Please report buff names and IDs to developer.`);
        } else if(!Object.values(BlessID).includes(data.blessId)) {
            // Invalid bless id
        } else if(data.blessId == BlessID.Free) {
            let response = PacketEncoder.BlessResponse(ErrorCode.Success, data.blessId, data.buffIds, false);
            session.socket.write(response);
        } else if(data.blessId == BlessID.Paid && data.isAds) {
            let response = PacketEncoder.BlessResponse(ErrorCode.Success, data.blessId, data.buffIds, true);
            session.socket.write(response);
        } else if(data.blessId == BlessID.Paid && !data.isAds && session.player.tickets.meal > 0) {
            session.player.tickets.meal--;

            let response = Buffer.concat([
                PacketEncoder.BlessResponse(ErrorCode.Success, data.blessId, data.buffIds, false),
                PacketEncoder.MealTicket(ErrorCode.Success, session.player.tickets.meal)
            ]);
            session.socket.write(response);
        } else if(data.blessId == BlessID.Paid && !data.isAds && session.player.diamonds >= Constants.MealPrice) {
            session.player.diamonds -= Constants.MealPrice;
            
            let response = Buffer.concat([
                PacketEncoder.BlessResponse(ErrorCode.Success, data.blessId, data.buffIds, false),
                PacketEncoder.DiamondNotify(0, session.player.diamonds)
            ]);
            session.socket.write(response);
        } else if(data.blessId == BlessID.Paid && !data.isAds && session.player.diamonds >= Constants.MealPrice) {
            // Not enough diamonds
        }
    }
}

module.exports = GamePacketHandler;