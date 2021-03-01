const {
  calcArmorFromEquipment,
  calcMelleFromEquipment,
  calcRangeFromEquipment,
} = require('./actor')

const baseEnemy = {
  hp: 5,
  ac: 5,
  dc: 5,

  str: 5,
  con: 5,
  dex: 5,
  int: 5,
  wis: 5,
  cha: 5,
}

const item = {
  melle: 0,
  range: 0,
  armor: 0,
  modifiers: [],
}

const enemyWeapon = [
  { // 0
    ...item,
    name: 'Slamer',
    melle: 2,
  },
]

const enemyArmor = [
  { // 0
    ...item,
    name: 'slime',
    armor: 2,
  },
]

function slimeGen() {
  const equipment = {
    armor: enemyArmor[0],
    left: item,
    right: enemyWeapon[0],
  }
  return {
    ...baseEnemy,
    equipment,
    power: {
      armor: calcArmorFromEquipment(equipment),
      melle: calcMelleFromEquipment(equipment),
      range: calcRangeFromEquipment(equipment),
    },
    name: 'slime',
  }
}

function dummyGen() {
  const equipment = {
    armor: item,
    left: item,
    right: item,
  }
  return {
    ...baseEnemy,
    equipment,
    power: {
      armor: calcArmorFromEquipment(equipment),
      melle: calcMelleFromEquipment(equipment),
      range: calcRangeFromEquipment(equipment),
    },
    name: 'dummy',
  }
}

module.exports = {
  slime: slimeGen(),
  dummy: dummyGen(),
}