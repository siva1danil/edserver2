const ElementID = require('./ElementID');
const SpellData$UnlockType = require('./SpellData$UnlockType');
const SpellID = require('./SpellID');

module.exports = {
    [SpellID.Shadowball]: {
        elements: [ ElementID.Lightning, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Vampire]: {
        elements: [ ElementID.Lightning, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.MiniBossStage3
    },
    [SpellID.IceCage]: {
        elements: [ ElementID.Water, ElementID.Lightning, ElementID.Ice ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.FrozenCage]: {
        elements: [ ElementID.Water, ElementID.Lightning, ElementID.Ice ],
        unlock: SpellData$UnlockType.StoryLevel6
    },
    [SpellID.Vortex]: {
        elements: [ ElementID.Water, ElementID.Lightning, ElementID.Ice ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.Volcano]: {
        elements: [ ElementID.Earth, ElementID.Lightning, ElementID.Ice ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Stonespikes]: {
        elements: [ ElementID.Earth, ElementID.Lightning, ElementID.Ice ],
        unlock: SpellData$UnlockType.MiniBossStage3
    },
    [SpellID.AcidRain]: {
        elements: [ ElementID.Water, ElementID.Lightning, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Corrosion]: {
        elements: [ ElementID.Water, ElementID.Lightning, ElementID.Darkness ],
        unlock: SpellData$UnlockType.MiniBossStage3
    },
    [SpellID.HydroGun]: {
        elements: [ ElementID.Water, ElementID.Lightning, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.Minefield]: {
        elements: [ ElementID.Earth, ElementID.Lightning, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.BlastMines]: {
        elements: [ ElementID.Earth, ElementID.Lightning, ElementID.Darkness ],
        unlock: SpellData$UnlockType.StoryLevel7
    },
    [SpellID.FlashBirds]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Lightning ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.BoomBirds]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Lightning ],
        unlock: SpellData$UnlockType.StoryLevel8
    },
    [SpellID.WaterCurse]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Lightning ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.GuidedLight]: {
        elements: [ ElementID.Water, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.BulletTrail]: {
        elements: [ ElementID.Water, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.MiniBossStage3
    },
    [SpellID.BubbleBurst]: {
        elements: [ ElementID.Water, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.BlastBeam]: {
        elements: [ ElementID.Earth, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.BoomBeam]: {
        elements: [ ElementID.Earth, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.StoryLevel1
    },
    [SpellID.SnowballCatapult]: {
        elements: [ ElementID.Earth, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.Snowstorm]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Ice ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Blizzard]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Ice ],
        unlock: SpellData$UnlockType.StoryLevel2
    },
    [SpellID.WaveShield]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Ice ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.ReindeerSleigh]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Ice ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.Hypergravity]: {
        elements: [ ElementID.Fire, ElementID.Lightning, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.BlackHole]: {
        elements: [ ElementID.Fire, ElementID.Lightning, ElementID.Darkness ],
        unlock: SpellData$UnlockType.MiniBossStage3
    },
    [SpellID.Phoenix]: {
        elements: [ ElementID.Fire, ElementID.Lightning, ElementID.Ice ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.FlameBirds]: {
        elements: [ ElementID.Fire, ElementID.Lightning, ElementID.Ice ],
        unlock: SpellData$UnlockType.StoryLevel3
    },
    [SpellID.GiftMissile]: {
        elements: [ ElementID.Fire, ElementID.Lightning, ElementID.Ice ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.Thunderbolt]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Lightning ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Thunderstorm]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Lightning ],
        unlock: SpellData$UnlockType.MiniBossStage3
    },
    [SpellID.WaterBlast]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Lightning ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.Rupture]: {
        elements: [ ElementID.Fire, ElementID.Earth, ElementID.Lightning ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Earthquake]: {
        elements: [ ElementID.Fire, ElementID.Earth, ElementID.Lightning ],
        unlock: SpellData$UnlockType.StoryLevel4
    },
    [SpellID.Shadowstorm]: {
        elements: [ ElementID.Fire, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Shadowsphere]: {
        elements: [ ElementID.Fire, ElementID.Ice, ElementID.Darkness ],
        unlock: SpellData$UnlockType.StoryLevel5
    },
    [SpellID.Turret]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Ice ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Gemini]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Ice ],
        unlock: SpellData$UnlockType.MiniBossStage3
    },
    [SpellID.WaterArrow]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Ice ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.Diamondwing]: {
        elements: [ ElementID.Fire, ElementID.Earth, ElementID.Ice ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.CrystalBirds]: {
        elements: [ ElementID.Fire, ElementID.Earth, ElementID.Ice ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.Arson]: {
        elements: [ ElementID.Fire, ElementID.Earth, ElementID.Ice ],
        unlock: SpellData$UnlockType.MiniBoss
    },
    [SpellID.FireBomb]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Fireflies]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.ToxicFog]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.DarkCurse]: {
        elements: [ ElementID.Fire, ElementID.Earth, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.Nightmare]: {
        elements: [ ElementID.Fire, ElementID.Earth, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.BlackArrows]: {
        elements: [ ElementID.Fire, ElementID.Earth, ElementID.Darkness ],
        unlock: SpellData$UnlockType.MiniBoss
    },
    [SpellID.DragonBreath]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Earth ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.DragonWrath]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Earth ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.WaterDragon]: {
        elements: [ ElementID.Fire, ElementID.Water, ElementID.Earth ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.PoisonBirds]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Free
    },
    [SpellID.VenomBirds]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Store
    },
    [SpellID.LiquidBomb]: {
        elements: [ ElementID.Water, ElementID.Earth, ElementID.Darkness ],
        unlock: SpellData$UnlockType.Store
    }
}