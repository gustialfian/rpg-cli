const { produce } = require('immer')

/**
 * check other player status
 * - poison
 * - stun
 * - attack Up
 *
 * move to status.js
 */
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

function isDead(player) {
  if (player.hp > 0) {
    return player
  }
  return 'dead'
}

module.exports = {
  checkStatus,
}