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


function generateBattle(players, goal) {
  const initBattle = {
    ...battle,
    players,
    goal,
  }
  return initBattle
}

function calcBattle(battle, commands) {
  // filter duplicate command from same actor
  // and pick the first one
  // sorting maybe helps
  const nextTurn = commands.reduce((acc, cur) => {
    return parseCommand(acc, cur)
  }, takeTurn(battle))

  const winChecked = checkWin(nextTurn)
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

module.exports = {
  generateBattle,
  calcBattle,
}