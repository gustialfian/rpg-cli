const { slime, dummy } = require('./enemy')
const {
  getStarterEquipment,
  pickEquipment,
  generatePlayerActor
} = require('./actor')
const {
  generateBattle,
  calcBattle,
  getPlayerIndexByName,
  history,
} = require('./battle')
console.log("hello rpg")

function gameLoop() {
  // character creation
  const name = 'Jowy'
  const hp = 10
  const abilityScore = {
    hp,
    str: 10,
    con: 10,
    dex: 10,
    int: 10,
    wis: 10,
    cha: 10,
  }
  const starterEquipment = getStarterEquipment()
  const choosenEquipment = {
    armor: 1,
    left: 3,
    right: 1,
  }
  const baseActor = pickEquipment(starterEquipment, choosenEquipment)
  const jowy = generatePlayerActor({ baseActor, abilityScore, name })

  // battle setup
  const players = []
  players.push(jowy)
  players.push(slime)
  players.push(dummy)
  const goal = {
    name: 'kill',
    target: 'slime',
  }
  const initBattle = generateBattle(players, goal);

  const turn1Jowy = {
    action: 'attack',
    actor: getPlayerIndexByName(initBattle, 'Jowy'),
    target: getPlayerIndexByName(initBattle, 'slime'),
  }
  const turn1Slime = {
    action: 'attack',
    actor: getPlayerIndexByName(initBattle, 'slime'),
    target: getPlayerIndexByName(initBattle, 'Jowy'),
  }
  const turn1Dummy = {
    action: 'attack',
    actor: getPlayerIndexByName(initBattle, 'dummy'),
    target: getPlayerIndexByName(initBattle, 'dummy'),
  }

  const turn1 = calcBattle(initBattle, [turn1Jowy, turn1Slime, turn1Dummy])
  const turn2 = calcBattle(turn1, [turn1Jowy, turn1Slime, turn1Dummy])
  const turn3 = calcBattle(turn2, [turn1Jowy, turn1Slime, turn1Dummy])

  // console.log(`logs:`, history[0].players[])
  console.log(`logs:`, slime, dummy)
}

gameLoop()
