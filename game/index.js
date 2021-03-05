const { save } = require('../util/file')

const { jowy } = require('./characters')
const { slime, dummy } = require('./enemy')
const {
  generateBattle,
  calcBattle,
  getPlayerIndexByName,
  history,
} = require('./battle')
const { baseCommand } = require('./action')
const { initBattle } = require('../test/sample-state')
const { potions } = require('./item')
const { addItemToInventory, listInventory } = require('./inventory')


console.log("hello rpg")


function gameLoop() {
  const goal = {
    name: 'debug',
  }
  const init = generateBattle([jowy, slime], goal)

  const commands = [
    {
      ...baseCommand,
      action: 'attack',
      actor: 1,
      target: 0,
    },
    {
      ...baseCommand,
      action: 'attack',
      actor: 0,
      target: 1,
    },
  ]
  const nt = calcBattle(init, commands)
  console.log(nt)
}

gameLoop()
