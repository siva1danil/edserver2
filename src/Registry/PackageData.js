const ItemID = require('./ItemID');
const PackageID = require('./PackageID');

module.exports = {
    [PackageID.TreasureBag]: {
        cost: 10,
        loot: {
            [ItemID.Gem]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.Energy]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystalShard]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystalGrain]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystal]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.PerfectMagicCrystal]: { chance: 1.0, min: 1, max: 1 }
        }
    },
    [PackageID.MysteriousTreasure]: {
        cost: 25,
        loot: {
            [ItemID.Gem]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.Energy]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystalShard]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystalGrain]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystal]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.PerfectMagicCrystal]: { chance: 1.0, min: 1, max: 1 }
        }
    },
    [PackageID.SparklingTreasure]: {
        cost: 60,
        loot: {
            [ItemID.Gem]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.Energy]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystalShard]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystalGrain]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.MagicCrystal]: { chance: 1.0, min: 1, max: 1 },
            [ItemID.PerfectMagicCrystal]: { chance: 1.0, min: 1, max: 1 }
        }
    },
    [PackageID.SecretChest]: {
        cost: 0,
        loot: {}
    },
    [PackageID.MysteriousChest]: {
        cost: 0,
        loot: {}
    },
    [PackageID.SparklingChest]: {
        cost: 0,
        loot: {}
    }
}