const battle = require('../game/battle')
const { jowy } = require('../game/characters')
const { slime, dummy } = require('../game/enemy')

const { initBattle, turn1 } = require('./sample-state')

test('generate battle', () => {
  const players = [jowy, slime, dummy]
  const goal = {
    name: 'kill',
    target: 'slime',
  }
  const res = battle.generateBattle(players, goal)
  expect(res).toStrictEqual(initBattle);
});

test('calculate battle', () => {
  const commands = [
    {
      action: 'attack',
      actor: 0,
      target: 1,
    },
    {
      action: 'attack',
      actor: 1,
      target: 0,
    },
    {
      action: 'attack',
      actor: 2,
      target: 2,
    },
  ]
  const res = battle.calcBattle(initBattle, commands)
  expect(res).toStrictEqual(turn1);
});

test('get player index by name', () => {
  const res = battle.getPlayerIndexByName(initBattle, 'Jowy')
  const exp = 0
  expect(res).toBe(exp)
})