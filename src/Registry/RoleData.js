const RoleID = require('./RoleID');

module.exports = {
    [RoleID.Mage]: { cost: 0 },
    [RoleID.Hunter]: { cost: 300 },
    [RoleID.Ronin]: { cost: 300 },
    [RoleID.Bomber]: { cost: 600 },
    [RoleID.Warlock]: { cost: 600 },
    [RoleID.Kitty]: { cost: 600 },
    [RoleID.ShieldKnight]: { cost: 800 }
}