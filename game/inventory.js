
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

function findIndexItem(inventory, item) {
  return inventory.findIndex(v => v.name == item.name)
}

module.exports = {
  incStack,
  decStack,
  cleanUp,
}