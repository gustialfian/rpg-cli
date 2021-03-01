const { produce } = require('immer')

const battle = {
  turn: 0,
  players: [],
  commands: [],
  logs: [],
  goal: {},
  status: {}
}

const history = []

function generateBattle(players, goal) {
  return {
    ...battle,
    players,
    goal,
  }
}

function calcBattle(battle, commands) {
  const nextTurn = commands.reduce((acc, cur) => {
    const sideEffect = parseCommand(acc, cur)
    return sideEffect
  }, takeTurn(battle))

  const statusChecked = checkStatus(nextTurn)
  const winChecked = checkWin(statusChecked)
  history.push(winChecked)
  return winChecked
}

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

function takeTurn(battle) {
  return {
    ...battle,
    turn: battle.turn + 1,
    commands: [],
    logs: [],
  }
}

function getPlayerIndexByName(battle, name) {
  return battle.players.findIndex(v => v.name == name)
}

// action
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
    draft.commands =  commands
  })
}

function checkWin(battle) {
  switch (battle.goal.name) {
    case 'kill':
      return killGoal(battle)

    default:
      break;
  }
}

function killGoal(battle) {
  const isDead = battle.status[battle.goal.target] == 'dead'

  const logs = [...battle.logs]
  logs.push(`Win`)
  return produce(battle, draft => {
    draft.logs = logs
    draft.goal.isDone = isDead
  })
}

function checkStatus(battle) {
  const status = battle.players
    .filter(v => v.hp <= 0)
    .reduce((acc, cur) => {
      return {
        ...acc,
        [cur.name]: 'dead'
      }
    }, {})
  
  return produce(battle, draft => {
    draft.status = status
  })
}

module.exports = {
  generateBattle,
  calcBattle,
  getPlayerIndexByName,
  history,
}