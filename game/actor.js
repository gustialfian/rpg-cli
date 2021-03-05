
const actor = {
  hp: 0,
  maxHp: 0,

  /**
   * right now equipment do nothing for character 
   * - desing and impl it
   */
  equipment: {},

  inventory: [],
  status: [],

  name: 'base actor',
}

function generatePlayerActor({ baseActor, abilityScore, name }) {
  return {
    ...baseActor,
    ...abilityScore,
    name,
  }
}


module.exports = {
  actor,
  generatePlayerActor,
}