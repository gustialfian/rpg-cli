const { produce } = require('immer')
const { removeItemInInventory } = require('./actor')

const listAction = {
  attack: 'attack',
  wait: 'wait',
  use_item: 'use_item',
  skill: 'skill',
}

const baseCommand = {
  actor: -1,
  action: '',
  item: -1,
  skill: -1,
  target: -1,
}

function parseCommand(battle, command) {
  switch (command.action) {
    case listAction.wait:
      return wait(battle, command)
    case listAction.attack:
      return attack(battle, command)
    case listAction.use_item:
      return useItem(battle, command)
    case listAction.skill:
      return skill(battle, command)
    default:
      return battle
  }
}

function wait(battle, command) {
  const actor = battle.players[command.actor]

  const commands = [...battle.commands, command]
  const logs = [...battle.logs, `${actor.name} waiting`]

  return produce(battle, d => {
    d.logs = logs
    d.commands = commands
  })
}

function attack(battle, command) {
  const actor = battle.players[command.actor]
  const target = battle.players[command.target]
  const status = [...target.status]

  const commands = [...battle.commands, command]
  const logs = [...battle.logs, `${actor.name} attack ${target.name} for ${actor.atk}`]

  const result = hit(target, actor.atk)
  if (result.hp <= 0) {
    status.push('dead')
    logs.push(`${target.name} is dead`)
  }

  return produce(battle, d => {
    d.players[command.target] = result
    d.logs = logs
    d.commands = commands
  })
}

function useItem(battle, command) {
  const actor = battle.players[command.actor]
  const target = battle.players[command.target]
  const item = actor.inventory[command.item]

  if (!item) return battle

  const commands = [...battle.commands, command]
  const logs = [...battle.logs, `${actor.name} use ${item.name} to ${target.name}`]

  const result = execute(target, item)
  const actorInventory = command.actor == command.target ? result : actor
  const actorAfterUse = removeItemInInventory(actorInventory, item)

  return produce(battle, d => {
    d.players[command.target] = result
    d.players[command.actor] = actorAfterUse
    d.commands = commands
    d.logs = logs
  })
}

function skill(battle, command) {
  const actor = battle.players[command.actor]
  const target = battle.players[command.target]
  const skill = actor.skill[command.skill]

  const commands = [...battle.commands, command]
  const logs = [...battle.logs, `${actor.name} cast ${skill.name} to ${target.name}`]

  if (actor.mp < skill.cost) {
    logs.push(`${actor.name} mp not enough`)
    return {
      ...battle,
      commands,
      logs,
    }
  }

  const result = execute(target, skill)
  const actorMp = command.actor == command.target ? result : actor
  const actorAfterCast = useMp(actorMp, skill.cost)

  return produce(battle, d => {
    d.players[command.target] = result
    d.players[command.actor] = actorAfterCast
    d.commands = commands
    d.logs = logs
  })
}

function execute(target, item) {
  return pipe(
    (t) => executeHeal(t, item),
    (t) => executeHit(t, item),
    (t) => setStatus(t, item),
  )(target)
}

function executeHeal(target, healer) {
  if (healer.heal <= 0) return target
  return heal(target, healer.heal)
}

function executeHit(target, attacker) {
  if (attacker.atk <= 0) return target
  return hit(target, attacker.atk)
}

function setStatus(target, statuser) {
  return removeStatus(addStatus(target, statuser), statuser)
}

function addStatus(target, statuser) {
  const status = new Set([...target.status, ...statuser.addStatus])
  return produce(target, d => {
    d.status = [...status]
  })
}

function removeStatus(target, statuser) {
  const status = new Set(target.status)
  statuser.removeStatus.forEach(v => {
    status.delete(v)
  });
  return produce(target, d => {
    d.status = [...status]
  })
}

function hit(target, point) {
  const hp = target.hp - point
  const normalizeHP = hp <= 0 ? 0 : hp
  return produce(target, d => {
    d.hp = normalizeHP
  })
}

function heal(target, point) {
  const hp = target.hp + point
  const normalizeHp = hp > target.maxHp ? target.maxHp : hp
  return produce(target, d => {
    d.hp = normalizeHp
  })
}

function useMp(player, point) {
  const mp = player.mp - point
  const normalizeMp = mp <= 0 ? 0 : mp
  return produce(player, d => {
    d.mp = normalizeMp
  })
}

function pipe(...fns) {
  return v => fns
    .reduce((val, fn) => fn(val), v)
}

module.exports = {
  baseCommand,
  listAction,
  parseCommand,
}