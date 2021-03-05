const {
  actor,
  calcArmorFromEquipment,
  calcMelleFromEquipment,
  calcRangeFromEquipment
} = require('./actor')
const {
  armor,
  weapon,
  potions
} = require('./item')

const jowy = {
  ...actor,
  hp: 10,
  maxHp: 10,
  atk: 5,
  equipment: {
    armor: armor[1],
    left: weapon[1],
    right: weapon[3],
  },
  inventory: [
    potions[0],
    potions[0],
    potions[1],
    potions[2],
  ],
  name: "Jowy"
}

module.exports = {
  jowy,
}