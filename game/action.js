const { produce } = require('immer')

function parseCommand(battle, command) {
  switch (command.action) {
    case 'attack':
      return attack(battle, command)
    case 'wait':
      return wait(battle, command)
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

  // attack logic
  let hp = target.hp - actor.power.melle
  if (hp <= 0) hp = 0
  logs.push(`${actor.name} attack ${target.name} for ${actor.power.melle}`)

  return produce(battle, draft => {
    draft.players[command.target].hp = hp
    draft.logs = logs
    draft.commands = commands
  })
}

function wait(battle, command) {
  const actor = battle.players[command.actor]
  const logs = [...battle.logs]
  logs.push(`${actor.name} waiting`)

  return produce(battle, draft => {
    draft.logs = logs
  })
}

module.exports = {
  parseCommand,
}