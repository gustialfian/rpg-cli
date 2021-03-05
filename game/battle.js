const { produce } = require('immer')
const { checkWin } = require('./goal')
const { parseCommand } = require('./action')

const battle = {
  players: [],
  commands: [],
  logs: [],
  goal: {},
  turn: 0,
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
    return parseCommand(acc, cur)
  }, takeTurn(battle))

  const winChecked = checkWin(nextTurn)
  history.push(winChecked)
  return winChecked
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