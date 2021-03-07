const { produce } = require('immer')

const {
  incStack,
  decStack,
  cleanUp,
} = require('./inventory')

const actor = {
  hp: 0,
  maxHp: 0,
  mp: 0,
  maxMp: 0,

  atk: 0,
  def: 0,

  /**
   * right now equipment do nothing for character 
   * - design and impl it
   */
  equipment: {},

  inventory: [],
  skillSlot: 1,
  skill: [],
  status: [],

  lv: 1,
  name: 'base actor',
}

function initActor(name) {
  return {
    ...actor,
    name,
  }
}

function setMaxStat(player, { maxHp, maxMp }) {
  return {
    ...player,
    hp: maxHp,
    maxHp: maxHp,
    mp: maxMp,
    maxMp: maxMp,
  }
}

function setEquipment(player, equipment) {
  const atkDef = Object.values(equipment)
    .reduce((acc, val) => {
      return {
        atk: acc.atk + val.atk,
        def: acc.def + val.def,
      }
    }, { atk: 0, def: 0 })
    
  return {
    ...player,
    ...atkDef,
    equipment,
  }
}

// skill
function addSkill(player, skill) {
  console.log(`hai`)
  if (isSKillSlotFull(player)) {
    return player
  }

  if (isSkillExists(player, skill)) {
    return player
  }

  const ps = [...player.skill, skill]
  return {
    ...player,
    skill: ps,
  }
}

function isSkillExists(player, skill) {
  const names = listSkill(player)
  return names.includes(skill.name)
}

function isSKillSlotFull(player) {
  return player.skillSlot < player.skill.length + 1
}

function listSkill(player) {
  return player.skill.map(v => v.name)
}

// inventory
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
  if (!isItemExists(player, item)) {
    return player
  }
  let inventory = [...player.inventory]
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


module.exports = {
  actor,
  initActor,
  setMaxStat,
  setEquipment,
  addSkill,
  addItemToInventory,
  removeItemInInventory,
}