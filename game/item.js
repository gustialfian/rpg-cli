const item = {
  melle: 0,
  range: 0,
  armor: 0,
  heal: 0,
  modifiers: [],
}

const armor = [
  {
    ...item,
    armor: 11,
    name: 'light armor',
  },
  {
    ...item,
    armor: 12,
    name: 'medium armor',
  },
  {
    ...item,
    armor: 14,
    name: 'heavy armor',
  },
]

const weapon = [
  {
    ...item,
    melle: 4,
    name: 'Dagger',
  },
  {
    ...item,
    melle: 6,
    name: 'Short Sword',
  },
  {
    ...item,
    range: 8,
    name: 'Longbow',
  },
  {
    ...item,
    melle: 6,
    armor: 2,
    name: 'shield',
  },
]

const potions = [
  {
    ...item,
    heal: 5,
    name: 'small heal potion',
    count: 0,
  },
]

function addInventory(player, item) {
  // check if exists
  const itemName = player.item.map(v => v.name)
  const isExists = itemName.includes(item.name)
  const itemTotal = player.item
    .filter(v => v == item.name)
    .map(v => {
      return {
        ...v,
        count: v.count + item.count,
      }
    })
  
  // sum the count
  // or
  // add new
  
}

module.exports = {
  armor,
  weapon,
  potions,
}