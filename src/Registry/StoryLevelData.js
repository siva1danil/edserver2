const SpellID = require('./SpellID');
const LevelID = require('./StoryLevelID');
module.exports = {
    [LevelID.DangerousDungeon]: {
        depth: 11,
        reward: {
            spell: SpellID.BoomBeam,
            energy: 300
        }
    },
    [LevelID.DeadlyDesert]: {
        depth: 16,
        reward: {
            spell: SpellID.Blizzard,
            energy: 500
        }
    },
    [LevelID.ChillyCavern]: {
        depth: 16,
        reward: {
            spell: SpellID.FlameBirds,
            energy: 800
        }
    },
    [LevelID.SporeSpaces]: {
        depth: 21,
        reward: {
            spell: SpellID.Earthquake,
            energy: 1200
        }
    },
    [LevelID.LavaLand]: {
        depth: 21,
        reward: {
            spell: SpellID.Shadowsphere,
            energy: 1700
        }
    },
    [LevelID.MadMine]: {
        depth: 26,
        reward: {
            spell: SpellID.FrozenCage,
            energy: 2300
        }
    },
    [LevelID.StinkingSewers]: {
        depth: 26,
        reward: {
            spell: SpellID.BlastMines,
            energy: 3100
        }
    },
    [LevelID.CreepyCemetery]: {
        depth: 31,
        reward: {
            spell: SpellID.BoomBirds,
            energy: 4000
        }
    }
}