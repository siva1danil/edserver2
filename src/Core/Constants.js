const SpellID = require('../Registry/SpellID');
const DateTime = require('../Util/DateTime');

module.exports = {
    NewPlayer: {
        uid: 0,
        aid: '',
        name: '',
        guide: {
            intro: false,
            equipment: false,
            equipment_overview: false,
            equipment_decipher: false,
            spells: false,
            spells_overview: false
        },
        login: {
            day: DateTime.day() - 1,
            count: 0
        },
        reward: {
            day: DateTime.day() - 1,
            count: 0
        },
        role: 1,
        roles: {
            1: { unlocked: true, skin: 1001, skins: [1001], equipment: [ 0, -1, -1, -1, -1 ] },
            2: { unlocked: false, skin: 2001, skins: [2001], equipment: [ 0, -1, -1, -1, -1 ] },
            3: { unlocked: false, skin: 3001, skins: [3001], equipment: [ 0, -1, -1, -1, -1 ] },
            4: { unlocked: false, skin: 4001, skins: [4001], equipment: [ 0, -1, -1, -1, -1 ] },
            5: { unlocked: false, skin: 5001, skins: [5001], equipment: [ 0, -1, -1, -1, -1 ] },
            6: { unlocked: false, skin: 6001, skins: [6001], equipment: [ 0, -1, -1, -1, -1 ] },
            7: { unlocked: false, skin: 7001, skins: [7001], equipment: [ 0, -1, -1, -1, -1 ] }
        },
        levels: {
            1: { depth: 0, reward: false },
            2: { depth: 0, reward: false },
            3: { depth: 0, reward: false },
            4: { depth: 0, reward: false },
            5: { depth: 0, reward: false },
            6: { depth: 0, reward: false },
            7: { depth: 0, reward: false },
            8: { depth: 0, reward: false }
        },
        equipment: {},
        decipher: [ null, null ],
        items: {},
        keys: [],
        packages: [ 0, 0, -1, -1,  -1, -1, -1, -1,  -1, -1, -1, -1 ],
        spells: {
            [SpellID.Hypergravity]: 1,
            [SpellID.FireBomb]: 1,
            [SpellID.Turret]: 1,
            [SpellID.Diamondwing]: 1,
            [SpellID.GuidedLight]: 1,
            [SpellID.FlashBirds]: 1,
            [SpellID.Thunderbolt]: 1,
            [SpellID.DragonBreath]: 1,
            [SpellID.BlastBeam]: 1,
            [SpellID.Minefield]: 1,
            [SpellID.Rupture]: 1,
            [SpellID.AcidRain]: 1,
            [SpellID.IceCage]: 1,
            [SpellID.Snowstorm]: 1,
            [SpellID.Volcano]: 1,
            [SpellID.Phoenix]: 1,
            [SpellID.Shadowstorm]: 1,
            [SpellID.Shadowball]: 1,
            [SpellID.DarkCurse]: 1,
            [SpellID.PoisonBirds]: 1,
        },
        diamonds: 0,
        energy: 0,
        mana: [ 90, Math.floor(Date.now() / 1000) ],
        tickets: {
            revive: 0,
            element: 0,
            meal: 0,
            reset: 0
        },
        donated: false,
        game: null
    },
    FirstUid: 2,
    SecondsPerMana: 8 * 60,
    MaxMana: 90,
    DiamondsPerReward: 50,
    SocketTimeout: 30000,
    MealPrice: 20
}