const { produce } = require('immer')
const { checkWin } = require('./goal')
const { parseCommand } = require('./action')

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
  const initBattle = {
    ...battle,
    players,
    goal,
  }
  history.push(initBattle)
  return initBattle
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

module.exports = {
  generateBattle,
  calcBattle,
  getPlayerIndexByName,
  history,
}