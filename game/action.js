const { produce } = require('immer')

function action({ state, action }) {
  switch (action) {
    case 'a':
      return {
        ...state,
        c2: checkStatus(attack(state.c1, state.c2)),
        battle: nextTurn(state.battle),
      }
    case 'h':
      return {
        ...state,
        c2: checkStatus(heal(state.c1, state.c2)),
        battle: nextTurn(state.battle),
      }
    default:
      console.log('unknown action')
      return state
  }
}

function checkStatus(char) {
  const isDead = char.hp <= 0 || char.status.indexOf('dead') >= 0
  const isRevive = char.hp > 0 && isDead
  return produce(char, draf => {
    const { status } = draf
    if (isDead && !isRevive) {
      status.push('dead')
      draf.hp = 0
    }
    if (isRevive) {
      const i = char.status.indexOf('dead')
      status.splice(i, 1);
    }
  })
}

function attack(actor, target) {
  const total = actor.atk - target.def
  const hp = target.hp - total
  return produce(target, draft => {
    draft.hp = hp
  })
}

function heal(actor, target) {
  const total = 3
  const hp = target.hp + total
  const isMaxed = hp > target.maxHp
  return produce(target, draft => {
    draft.hp = isMaxed ? draft.maxHp : hp
  })
}

function nextTurn(battle) {
  return produce(battle, draft => {
    draft.turn++
  })
}

module.exports = {
  action,
  checkStatus,
  attack,
  heal,
  nextTurn,
}