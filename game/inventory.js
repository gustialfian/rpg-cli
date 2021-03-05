const { produce } = require('immer')

function addItemToInventory(player, item) {
  const inventory = [...player.inventory]
  inventory.push(item)
  return produce(player, d => {
    d.inventory = inventory
  })
}

function listInventory(player) {
  return player.inventory.map(v => v.name)
}

module.exports = {
  addItemToInventory,
  listInventory,
}