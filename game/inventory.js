const { produce } = require('immer')

function addItemToInventory(player, item) {
  let inventory = [...player.inventory]
  if (!isItemExists(player, item)) {
    inventory.push(item)
  }
  inventory = incStack(inventory, item)
  return produce(player, d => {
    d.inventory = inventory
  })
}

function removeItemInInventory(player, item) {
  let inventory = [...player.inventory]
  if (!isItemExists(player, item)) {
    return player
  }
  inventory = decStack(inventory, item)
  inventory = cleanUp(inventory)
  return produce(player, d => {
    d.inventory = inventory
  })
}

function listInventory(player) {
  return player.inventory.map(v => v.name)
}

function isItemExists(player, item) {
  const names = listInventory(player)
  return names.includes(item.name)
}

function findIndexItem(inventory, item) {
  return inventory.findIndex(v => v.name == item.name)
}

function incStack(inventory, item) {
  const idx = findIndexItem(inventory, item)
  let res = [...inventory]
  res[idx] = {
    ...res[idx],
    stack: res[idx].stack + 1
  }
  return res
}

function decStack(inventory, item) {
  const idx = findIndexItem(inventory, item)
  let res = [...inventory]
  res[idx] = {
    ...res[idx],
    stack: res[idx].stack - 1
  }
  return res
}

function cleanUp(inventory) {
  let res = [...inventory]
  const itemsToRemove = res.filter(v => v.stack <= 0)
  itemsToRemove.forEach(v => {
    const idx = findIndexItem(res, v)
    res = [
      ...res.slice(0, idx),
      ...res.slice(idx + 1),
    ]
  })
  return res
}

module.exports = {
  listInventory,
  addItemToInventory,
  removeItemInInventory,
}