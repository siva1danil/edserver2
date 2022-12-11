const ErrorCode = require('../Protocol/ErrorCode');
const LockType = require('../Protocol/LockType');
const AccessoryID = require('../Registry/AccessoryID');
const Constants = require('./Constants');
const ItemID = require('../Registry/ItemID');
const PackageData = require('../Registry/PackageData');
const RoleID = require('../Registry/RoleID');
const SkinID = require('../Registry/SkinID');
const StoryLevelData = require('../Registry/StoryLevelData');
const StoryLevelID = require('../Registry/StoryLevelID');
const DateTime = require('../Util/DateTime');
const ObjectCodec = require('../Util/ObjectCodec');
const PacketEncoder = require('../Util/PacketEncoder');

class GameLogic {
    static calculateMana(player) {
        let delta = Math.floor((Math.floor(Date.now() / 1000) - player.mana[1]) / Constants.SecondsPerMana)
        let time = player.mana[1] + delta * Constants.SecondsPerMana;
        return [ Math.min(player.mana[0] + delta, Constants.MaxMana), time ];
    }

    static takeMana(player, amount) {
        let time = player.mana[0] == Constants.MaxMana
            ? Math.floor(Date.now() / 1000)
            : player.mana[1];
        let mana = player.mana[0] - amount;
        return [ mana, time ];
    }

    static getUnlockablePackageSlots(player) {
        for(let slot = 3; slot <= 12; slot++) {
            if(player.packages[slot - 1] != -1 || player.packages[slot - 2] == -1)
                continue;
            
            if(slot >= 3 && slot <= 8) {
                if(player.keys.length >= Math.min(slot - 1, 8))
                    return [ slot ];
            } else if(slot >= 9 && slot <= 12) {
                if(Object.values(player.roles).filter(item => item.unlocked).length >= Math.min(slot - 7, 5))
                    return [ slot ];
            }
        }
        return [];
    }

    static generatePackageLoot(id) {
        let table = PackageData[id].loot;
        let loot = [];
        for(let item of Object.keys(table)) {
            if(Math.random() > table[item].chance)
                continue;
            let amount = Math.floor(Math.random() * (table[item].max - table[item].min + 1)) + table[item].min;
            loot.push([ parseInt(item), amount ]);
        }
        return loot;
    }

    static addPackage(packages, id) {
        let index = packages.find(item => item == 0);
        if(index == -1) index = packages.find(item => item != -1 && item < id);
        if(index != -1) packages[index] = id;
        return packages;
    }

    // TODO: rewrite

    // giveDailyLoginReward(player, day) {
    //     if(day == 1) {
    //         player.diamonds += 20;
    //     } else if(day == 2) {
    //         player.roles[RoleID.Mage].skins.push(SkinID.Mage_Cool);
    //     } else if(day == 3) {
    //         player.equipment[AccessoryID.GargoyleWings] = 0;
    //     } else if(day == 4) {
    //         player.diamonds += 30;
    //     } else if(day == 5) {
    //         player.tickets.element++;
    //     } else if(day == 6) {
    //         player.diamonds += 50;
    //     } else if(day == 7) {
    //         player.roles[RoleID.Hunter].unlocked = true;
    //     } else if(day == 8) {
    //         player.roles[RoleID.Hunter].skins.push(SkinID.Hunter_DeerHunterSkin);
    //     }
    // }

    // async handle_set_shortinfo(shortInfo, res, data) {
    //     let player = await this.database.findPlayerByUid(data.uid);

    //     player.game = ObjectCodec.decodeShortInfo(shortInfo);
    //     await this.database.updatePlayer(player);
    // }

    // async handle_get_skillrecipe(id, res, data) {
    //     let player = await this.database.findPlayerByUid(data.uid);
    //     player.spells[id] = -1;
    //     await this.database.updatePlayer(player);

    //     let response = PacketEncoder.GetSkillRecipeRequest(ErrorCode.Success, id);
    //     res(response);
    // }
}

module.exports = GameLogic;