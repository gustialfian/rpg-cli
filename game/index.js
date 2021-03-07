const { save } = require('../util/file')

const { jowy } = require('./characters')
const { slime, dummy } = require('./enemy')
const { baseCommand, listAction } = require('./action')
const { potions } = require('./item')
const { addItemToInventory, removeItemInInventory } = require('./inventory')
const { baseGoal, listGoal } = require('./goal')
const { generateBattle, calcBattle, history } = require('./battle')


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

  // console.log(dice(1, 20))
}

gameLoop()

function dice(n, d) {
  return n * getRandomInt(d)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}