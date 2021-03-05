const item = {
  melle: 0,
  range: 0,
  armor: 0,
  heal: 0,
  modifiers: [],
  addStatus: [],
  removeStatus: [],
}

const armor = [
  {
    ...item,
    armor: 11,
    name: 'light armor',
  },
  {
    ...item,
    armor: 12,
    name: 'medium armor',
  },
  {
    ...item,
    armor: 14,
    name: 'heavy armor',
  },
]

const weapon = [
  {
    ...item,
    melle: 4,
    name: 'Dagger',
  },
  {
    ...item,
    melle: 6,
    name: 'Short Sword',
  },
  {
    ...item,
    range: 8,
    name: 'Longbow',
  },
  {
    ...item,
    melle: 6,
    armor: 2,
    name: 'shield',
  },
]

const potions = [
  {
    ...item,
    heal: 5,
    name: 'potion',
  },
  {
    ...item,
    addStatus: ['posion'],
    name: 'posion',
  },
  {
    ...item,
    removeStatus:['posion'],
    name: 'antidote',
  },
  {
    ...item,
    addStatus: ['haste'],
    name: 'haste',
  },
]

module.exports = {
  armor,
  weapon,
  potions,
}