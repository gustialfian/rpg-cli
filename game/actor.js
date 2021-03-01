/**
 * 
const hero = {
  name: 'hero'
  hp: 10,
  ac: 10,
  dc: 10,

  str: 10,
  con: 10,
  dex: 10,
  int: 10,
  wis: 10,
  cha: 10,

  equipment: {
    left: {
      ...item,
      name: 'Short Sword',
      melle: 6,
    },
    right: {
      ...item,
      name: 'shield',
      melle: 6,
      armor: 2,
    },
    armor: {
      ...item,
      name: 'light armor',
      armor: 11,
    },
  },

  // turunan equipment
  power: {
    melle: 0 // total melle or range
  },
}
 */
const actor = {
  hp: 0,
  ac: 0,
  dc: 0,

  str: 0,
  con: 0,
  dex: 0,
  int: 0,
  wis: 0,
  cha: 0,

  equipment: {},
  power: {}
}

const baseActor = {
  ...actor,
  hp: 10,
  ac: 10,
  dc: 10,

  str: 10,
  con: 10,
  dex: 10,
  int: 10,
  wis: 10,
  cha: 10,
}

const item = {
  melle: 0,
  range: 0,
  armor: 0,
  modifiers: [],
}

const armor = [
  {
    ...item,
    name: 'light armor',
    armor: 11,
  },
  {
    ...item,
    name: 'medium armor',
    armor: 12,
  },
  {
    ...item,
    name: 'heavy armor',
    armor: 14,
  },
]

const weapon = [
  {
    ...item,
    name: 'Dagger',
    melle: 4,
  },
  {
    ...item,
    name: 'Short Sword',
    melle: 6,
  },
  {
    ...item,
    name: 'Longbow',
    range: 8,
  },
  {
    ...item,
    name: 'shield',
    melle: 6,
    armor: 2,
  },
]

function generatePlayerActor({ baseActor, abilityScore, name }) {
  return {
    ...baseActor,
    ...abilityScore,
    name,
  }
}

function getStarterEquipment() {
  // return list of starter equipment
  return {
    armor,
    weapon,
  }
}

function pickEquipment(listEquipment, choosenEquipment) {
  // console.log({
  //   listEquipment,
  //   choosenEquipment,
  // })

  const equipment = {
    armor: listEquipment.armor[choosenEquipment.armor],
    left: listEquipment.weapon[choosenEquipment.left],
    right: listEquipment.weapon[choosenEquipment.right],
  }

  // console.log(armor)

  return {
    ...actor,
    equipment,
    power: {
      armor: calcArmorFromEquipment(equipment),
      melle: calcMelleFromEquipment(equipment),
      range: calcRangeFromEquipment(equipment),
    }
  }
}

function calcArmorFromEquipment(equipment) {
  const total = Object.values(equipment)
    .filter(v => v.armor > 0)
    .reduce((acc, cur) => acc += cur.armor, 0)
  return total
}

function calcMelleFromEquipment(equipment) {
  const total = Object.values(equipment)
    .filter(v => v.melle > 0)
    .reduce((acc, cur) => acc += cur.melle, 0)
  return total
}

function calcRangeFromEquipment(equipment) {
  const total = Object.values(equipment)
    .filter(v => v.range > 0)
    .reduce((acc, cur) => acc += cur.range, 0)
  return total
}


module.exports = {
  getStarterEquipment,
  pickEquipment,
  generatePlayerActor,
  calcArmorFromEquipment,
  calcMelleFromEquipment,
  calcRangeFromEquipment,
}