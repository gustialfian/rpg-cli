const act = require('../game/action')

test('attack', () => {
  const actor = {
    name: 'test',
    atk: 5,
  }
  const target = {
    name: 'test',
    status: [],
    hp: 10,
    def: 2,
  }
  const res = act.checkStatus(act.attack(actor, target))
  const exp = {
    ...target,
    hp: 7,
  }
  expect(res).toStrictEqual(exp);
});

test('attack and dead', () => {
  const actor = {
    name: 'test',
    atk: 10,
  }
  const target = {
    name: 'test',
    status: [],
    hp: 10,
    def: 0,
  }
  const res = act.checkStatus(act.attack(actor, target))
  const exp = {
    ...target,
    hp: 0,
    status: ['dead']
  }
  expect(res).toStrictEqual(exp);
});

test('heal', () => {
  const actor = {}
  const target = {
    name: 'test',
    status: [],
    hp: 2,
  }
  const res = act.checkStatus(act.heal(actor, target))
  const exp = {
    ...target,
    hp: 5,
  }
  expect(res).toStrictEqual(exp);
});

test('heal maxed', () => {
  const actor = {}
  const target = {
    name: 'test',
    status: [],
    hp: 9,
    maxHp: 10,
  }
  const res = act.checkStatus(act.heal(actor, target))
  const exp = {
    ...target,
    hp: 10,
  }
  expect(res).toStrictEqual(exp);
});

test('heal and revive', () => {
  const actor = {}
  const target = {
    name: 'test',
    status: ['dead'],
    hp: -1,
    maxHp: 10,
  }
  const res = act.checkStatus(act.heal(actor, target))
  const exp = {
    ...target,
    hp: 2,
    status: [],
  }
  expect(res).toStrictEqual(exp);
});