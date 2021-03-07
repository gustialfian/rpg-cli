const { save } = require('../util/file')

const { jowy } = require('./characters')
const { slime, dummy } = require('./enemy')
const { baseCommand, listAction } = require('./action')
const { potions, armor, weapon } = require('./item')
const { skill } = require('./skill')
const { baseGoal, listGoal } = require('./goal')
const { generateBattle, calcBattle, history } = require('./battle')
const { initActor, setMaxStat, setEquipment, addSkill, addItemToInventory } = require('./actor')


console.log("hello rpg")

function gameLoop() {
  // character creation
  let res = initActor('riou')
  res = setMaxStat(res, { maxHp: 30, maxMp: 15 })
  res = setEquipment(res, { weapon: weapon[4], armor: armor[0] })
  res = addSkill(res, skill[0])
  res = addItemToInventory(res, potions[0])

  console.log(res)
}

gameLoop()
