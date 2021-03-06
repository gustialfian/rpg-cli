const { save } = require('../util/file')

const { jowy } = require('./characters')
const { slime, dummy } = require('./enemy')
const {
  generateBattle,
  calcBattle,
  history,
} = require('./battle')
const { baseCommand, listAction } = require('./action')
const { potions } = require('./item')
const { addItemToInventory, removeItemInInventory } = require('./inventory')
const { baseGoal, listGoal } = require('./goal')


console.log("hello rpg")


function gameLoop() {
  const goal = {
    ...baseGoal,
    name: listGoal.debug
  }
  const init = generateBattle([jowy, slime], goal)
  const commands = [
    {
      ...baseCommand,
      actor: 1,
      action: listAction.attack,
      target: 0,
    },
    {
      ...baseCommand,
      actor: 0,
      action: listAction.use_item,
      item: 0,
      target: 0,
    },
  ]
  const nt = calcBattle(init, commands)
  console.log(nt)
}

gameLoop()

function dice(n, d) {

}
