
function characterCreation() {
  // character creation
  let res = initActor('riou')
  res = setMaxStat(res, { maxHp: 30, maxMp: 30 })
  res = setEquipment(res, { weapon: weapon[4], armor: armor[0] })
  res = addSkill(res, skill[0])
  res = addItemToInventory(res, potions[0])

  console.log(res)
}

function skill() {
  const goal = {
    ...baseGoal,
    name: listGoal.debug
  }
  const t0 = generateBattle([addItemToInventory(jowy, potions[1]), slime], goal)

  const t1 = calcBattle(t0, [
    {
      ...baseCommand,
      actor: 0,
      action: listAction.skill,
      skill: 2,
      target: 0,
    },
  ])

  console.log(t0.players[0].status)
  console.log(t1.players[0].status)
  console.log(t1.logs)
}

module.exports = {
  characterCreation,
  skill,
}