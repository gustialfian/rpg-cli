const {
  actor,
} = require('./actor')
const {
  armor,
  weapon,
  potions
} = require('./item')
const { skill } = require('./skill')

const jowy = {
  ...actor,
  hp: 10,
  maxHp: 10,
  mp: 10,
  maxMp: 10,
  atk: 5,
  equipment: {
    armor: armor[1],
    weapon: weapon[3],
  },
  skillSlot: 4,
  skill: [
    skill[0],
    skill[1],
    skill[2],
    skill[3],
  ],
  name: "Jowy",
}

module.exports = {
  jowy,
}