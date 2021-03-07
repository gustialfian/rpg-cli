const item = {
  atk: 0,
  def: 0,
  heal: 0,
  addStatus: [],
  removeStatus: [],
  stack: 0,
  name: 'base item',
}

const armor = [
  {
    ...item,
    def: 11,
    name: 'light armor',
  },
  {
    ...item,
    def: 12,
    name: 'medium armor',
  },
  {
    ...item,
    def: 14,
    name: 'heavy armor',
  },
]

const weapon = [
  {
    ...item,
    atk: 4,
    name: 'Dagger',
  },
  {
    ...item,
    atk: 6,
    name: 'Short Sword',
  },
  {
    ...item,
    atk: 8,
    name: 'Longbow',
  },
  {
    ...item,
    atk: 3,
    def: 2,
    name: 'Sword & Shield',
  },
  {
    ...item,
    atk: 5,
    name: 'Tonfas'
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