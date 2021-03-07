const { produce } = require('immer')

const baseSkill = {
  atk: 0,
  heal: 0,
  addStatus: [],
  removeStatus: [],
  cost: 0,
  name: 'base skill',
}

const skill = [
  {
    ...baseSkill,
    addStatus: ['atk_up'],
    cost: 5,
    name: 'focus',
  },
  {
    ...baseSkill,
    removeStatus: ['poison', 'silence', 'blind'],
    cost: 5,
    name: 'salve',
  },
  {
    ...baseSkill,
    atk: 5,
    addStatus: ['burn'],
    cost: 5,
    name: 'fire',
  },
  {
    ...baseSkill,
    heal: 5,
    cost: 5,
    name: 'medic',
  },
]

module.exports = {
  skill,
}