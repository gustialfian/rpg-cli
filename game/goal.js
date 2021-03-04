const { produce } = require('immer')

function checkWin(battle) {
  switch (battle.goal.name) {
    case 'kill':
      return killGoal(battle)

    default:
      return battle
  }
}

function killGoal(battle) {
  const isDead = battle.status[battle.goal.target] == 'dead'

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
}