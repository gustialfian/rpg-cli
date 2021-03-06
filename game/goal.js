const { produce } = require('immer')

const listGoal = {
  kill: 'kill',
  debug: 'debug',
}

const baseGoal = {
  name: listGoal.debug,
  target: -1,
  isDone: false,
}

function checkWin(battle) {
  switch (battle.goal.name) {
    case listGoal.kill:
      return killGoal(battle)

    default:
      return battle
  }
}

function killGoal(battle) {
  const isDead = battle.players[battle.goal.target].status.includes('dead')

  const logs = [...battle.logs]
  if (isDead) {
    logs.push(`Win`)
  }
  return produce(battle, draft => {
    draft.logs = logs
    draft.goal.isDone = isDead
  })
}

module.exports = {
  checkWin,
  listGoal,
  baseGoal,
}