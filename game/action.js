const { produce } = require('immer')

const baseCommand = {
  action: 'wait',
  item: -1,
  skill: -1,
  actor: -1,
  target: -1,
}

function parseCommand(battle, command) {
  switch (command.action) {
    case 'attack':
      return attack(battle, command)
    case 'wait':
      return wait(battle, command)
    case 'use_item':
      return useItem(battle, command)
    default:
      return 'unknown command'
  }
}

function attack(battle, command) {
  const commands = [...battle.commands]
  commands.push(command)

  const logs = [...battle.logs]

  const actor = battle.players[command.actor]
  const target = battle.players[command.target]
  const status = [...target.status]

  // attack logic
  let hp = target.hp - actor.atk
  if (hp <= 0) {
    hp = 0
    status.push('dead')
  }

  const result = {
    ...target,
    hp,
    status,
  }

  logs.push(`${actor.name} attack ${target.name} for ${actor.atk}`)
  return produce(battle, d => {
    d.players[command.target] = result
    d.logs = logs
    d.commands = commands
  })
}

function wait(battle, command) {
  const actor = battle.players[command.actor]

  const commands = [...battle.commands]
  commands.push(command)

  const logs = [...battle.logs]
  logs.push(`${actor.name} waiting`)

  return produce(battle, d => {
    d.logs = logs
    d.commands = commands
  })
}

function useItem(battle, command) {
  const item = battle.players[command.actor].inventory[command.item]
  if (!item) return battle

  const actor = battle.players[command.actor]
  const target = battle.players[command.target]

  const commands = [...battle.commands]
  commands.push(command)

  const logs = [...battle.logs]
  logs.push(`${actor.name} use ${item.name} to ${target.name}`)

  const heal = executeHeal(target, item)
  const result = setStatus(heal, item)

  return produce(battle, d => {
    d.players[command.target] = result
    d.logs = logs
    d.commands = commands
  })
}

function executeHeal(target, item) {
  if (item.heal == 0) return target
  return heal(target, item.heal)
}

function setStatus(target, item) {
  return removeStatus(addStatus(target, item), item)
}

function addStatus(target, item) {
  const status = new Set([...target.status, ...item.addStatus])
  return produce(target, d => {
    d.status = [...status]
  })
}

function removeStatus(target, item) {
  const status = new Set(target.status)
  item.removeStatus.forEach(v => {
    status.delete(v)
  });
  return produce(target, d => {
    d.status = [...status]
  })
}

function heal(target, point) {
  const hp = target.hp + point
  const normalizeHP = hp > target.maxHp ? target.maxHp : hp
  return produce(target, d => {
    d.hp = normalizeHP
  })
}

module.exports = {
  baseCommand,
  parseCommand,
}