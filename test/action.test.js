const { parseCommand } = require('../game/action')

test('action test js', () => {
  const res = parseCommand(initBattle, [])
  expect(true).toBe(false)
})