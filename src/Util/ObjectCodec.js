const LockType = require('../Protocol/LockType');
const Constants = require('../Core/Constants');
const StoryLevelData = require('../Registry/StoryLevelData');
const DateTime = require('./DateTime');

class ObjectCodec {
    static decodeShortInfo(shortInfo) {
        return {
            gamemode: shortInfo.gameMode,

            hp: shortInfo.roleHp,
            gold: [ shortInfo.goldCoin, shortInfo.goldCoinTotal ],
            time: shortInfo.surviveTime,
            exp: shortInfo.totalExp,

            powerup: shortInfo.elementLevel,
            elements: shortInfo.elements,
            accessories: shortInfo.accessorys,
            item: shortInfo.itemId ? [ shortInfo.itemId, shortInfo.itemNum ] : null,

            worlds: shortInfo.worlds.length > 0 ? shortInfo.worlds : [ shortInfo.world ],
            levels: shortInfo.levelType.length > 0 ? shortInfo.levelType : [ shortInfo.currLevelType ],
            depth: [ shortInfo.level, shortInfo.worldLevel ],

            effects: shortInfo.expUpEffectsNew.reduce((value, item) => (value[item.type] = item.value, value), {}),
            buffs: shortInfo.buffsNew.reduce((value, item) => (value[item.buffId] = item.buffTime, value), {}),

            energy: shortInfo.elementEnergy,
            equipment: shortInfo.lockItems,
            packages: shortInfo.packages,
            skills: shortInfo.skillRecipes
        }
    }

    static encodeServerConfig(config) {
        //
    }

    static encodeFlags(player) {
        let flags = [];
        if(player.guide.intro) flags.push(0);
        if(player.guide.equipment) flags.push(1);
        if(player.guide.equipment_overview) flags.push(2);
        if(player.guide.equipment_decipher) flags.push(3);
        if(player.guide.spells) flags.push(106);
        if(player.guide.spells_overview) flags.push(108);
        return flags;
    }

    static encodeGameInfo(player) {
        let object = {
            // General info
            userId: player.uid,
            roleId: player.role,
            nickName: player.name,
            serverTime: ~~(Date.now() / 1000),
            flags: this.encodeFlags(player),
            isFirstCharge: !player.donated,
            shortInfo: player.game ? this.encodeShortInfo(player.game) : undefined,
            totalDailySignRewardNum: player.login.count,
            totalLoginDay: player.login.day == DateTime.day() ? player.login.count : player.login.count + 1,
            freeDiamondCount: player.reward.day == DateTime.day() ? player.reward.count : 0,
            // Roles info
            unlockActors: Object.keys(player.roles)
                .filter(item => player.roles[item].unlocked),
            dresses: Object.keys(player.roles)
                .reduce((value, item) => value = value.concat(player.roles[item].skins), []),
            dressInfo: Object.keys(player.roles)
                .map(item => ({ actorId: item, dressId: player.roles[item].skin })),
            actorEquip: Object.keys(player.roles)
                .filter(item => player.roles[item].unlocked)
                .map(item => ({
                    roleId: item,
                    equipSlot: player.roles[item].equipment.map((item, index) => ({
                        slot: index,
                        itemId: item > 0 ? item : 0,
                        lockType: item == -1 ? LockType.Locked : LockType.Unlocked
                    }))
                })),
            // Equipment info
            lockItems: Object.keys(player.equipment)
                .filter(item => player.equipment[item] == -1),
            unlockItems: Object.keys(player.equipment)
                .filter(item => player.equipment[item] >= 0),
            unlockingItems: player.decipher
                .map((item, index) => ({ slot: index, itemId: item ? item.id : 0, startTime: item ? item.time : 0 })),
            accessoryLevelInfo: Object.keys(player.equipment)
                .filter(item => player.equipment[item] > 0)
                .map(item => ({ key: item, level: player.equipment[item] })),
            // Item info
            diamondReward: player.diamonds,
            elementEnergy: player.energy,
            pointInfo: {
                totalPoint: player.mana[0],
                lastTime: player.mana[1] + Constants.SecondsPerMana
            },
            reviveTicket: player.tickets.revive,
            eleTicketNum: player.tickets.element,
            mealTicketNum: player.tickets.meal,
            resetTicketNum: player.tickets.reset,
            tempItems: Object.keys(player.items)
                .map(item => ({ itemId: item, itemNum: player.items[item] })),
            packageList: player.packages
                .map((item, index) => ({ slot: index + 1, isOpen: item != -1, itemId: item > 0 ? item : undefined })),
            skillRecipes: Object.keys(player.spells)
                .map(item => ({ id: item, isCompose: player.spells[item] >= 0, isEquip: player.spells[item] == 1 })),
            // Other
            usedWorldKeys: player.keys,
            storyLevels: Object.keys(player.levels)
                .map(item => ({
                    level: item,
                    maxPassLevel: player.levels[item].depth,
                    isPass: player.levels[item].depth == StoryLevelData[item].depth,
                    getReward: player.levels[item].reward
                }))
        }
        return object;
    }

    static encodeShortInfo(game) {
        return {
            gameMode: game.gamemode,

            roleHp: game.hp,
            goldCoin: game.gold[0],
            goldCoinTotal: game.gold[1],
            surviveTime: game.time,
            totalExp: game.exp,

            elementLevel: game.powerup,
            levelDamageRate: Math.max(game.powerup * 100 - 1, 100),
            levelHpRate: Math.max(game.powerup * 100 - 1, 0),
            elements: game.elements,
            accessorys: game.accessories,
            itemId: game.item ? game.item[0] : 0,
            itemNum: game.item ? game.item[1] : 0,

            worlds: game.worlds,
            world: game.worlds[game.depth[0] - 1],
            levelType: game.levels,
            currLevelType: game.levels[game.levels.length - 1],
            level: game.depth[0],
            worldLevel: game.depth[1],

            expUpEffectsNew: Object.keys(game.effects)
                .map(item => ({ type: parseInt(item), value: game.effects[item] })),
            buffsNew: Object.keys(game.buffs)
                .map(item => ({ buffId: parseInt(item), buffTime: game.buffs[item] })),
            
            elementEnergy: game.energy,
            lockItems: game.equipment,
            packages: game.packages,
            skillRecipes: game.skills
        }
    }

    static encodePackagePointInfo(mana) {
        return { totalPoint: mana[0], lastTime: mana[1] + Constants.SecondsPerMana };
    }
}

module.exports = ObjectCodec;