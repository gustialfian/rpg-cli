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
  const goal = {
    ...baseGoal,
    name: listGoal.debug
  }
  const t0 = generateBattle([addItemToInventory(jowy, potions[1]), slime], goal)

  const t1 = calcBattle(t0, [
    {
      ...baseCommand,
      actor: 0,
      action: listAction.skill,
      skill: 2,
      target: 0,
    },
  ])

  console.log(t0.players[0].status)
  console.log(t1.players[0].status)
  console.log(t1.logs)
}

gameLoop()
