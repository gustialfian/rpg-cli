const {
  pickEquipment,
  generatePlayerActor
} = require('../game/actor')

test('pick equipment', () => {
  const item = {
    melle: 0,
    range: 0,
    armor: 0,
    modifiers: [],
  }
  const starterEquipment = {
    armor: [
      {
        ...item,
        name: 'light armor',
        armor: 11,
      },
      {
        ...item,
        name: 'medium armor',
        armor: 12,
      },
      {
        ...item,
        name: 'heavy armor',
        armor: 14,
      },
    ],
    weapon: [
      {
        ...item,
        name: 'Dagger',
        melle: 4,
      },
      {
        ...item,
        name: 'Short Sword',
        melle: 6,
      },
      {
        ...item,
        name: 'Longbow',
        range: 8,
      },
      {
        ...item,
        name: 'shield',
        melle: 6,
        armor: 2,
      },
    ]
  }
  const choosenEquipment = {
    armor: 1,
    left: 3,
    right: 1,
  }
  const res = pickEquipment(starterEquipment, choosenEquipment)
  const exp = {
    hp: 0,
    ac: 0,
    dc: 0,
    str: 0,
    con: 0,
    dex: 0,
    int: 0,
    wis: 0,
    cha: 0,
    equipment: {
      armor: {
        melle: 0,
        range: 0,
        armor: 12,
        modifiers: [],
        name: 'medium armor'
      },
      left: { melle: 6, range: 0, armor: 2, modifiers: [], name: 'shield' },
      right: {
        melle: 6,
        range: 0,
        armor: 0,
        modifiers: [],
        name: 'Short Sword'
      }
    },
    power: { armor: 14, melle: 12, range: 0 }
  }
  expect(res).toStrictEqual(exp);
});

test('generate character', () => {
  const name = 'Jowy'
  const abilityScore = {
    hp: 10,
    str: 10,
    con: 10,
    dex: 10,
    int: 10,
    wis: 10,
    cha: 10,
  }
  const baseActor = {
    hp: 0,
    ac: 0,
    dc: 0,
    str: 0,
    con: 0,
    dex: 0,
    int: 0,
    wis: 0,
    cha: 0,
    equipment: {
      armor: {
        melle: 0,
        range: 0,
        armor: 12,
        modifiers: [],
        name: 'medium armor'
      },
      left: { melle: 6, range: 0, armor: 2, modifiers: [], name: 'shield' },
      right: {
        melle: 6,
        range: 0,
        armor: 0,
        modifiers: [],
        name: 'Short Sword'
      }
    },
    power: { armor: 14, melle: 12, range: 0 }
  }
  const res = generatePlayerActor({ baseActor, abilityScore, name })
  const exp = {
    hp: 10,
    ac: 0,
    dc: 0,
    str: 10,
    con: 10,
    dex: 10,
    int: 10,
    wis: 10,
    cha: 10,
    equipment: {
      armor: {
        melle: 0,
        range: 0,
        armor: 12,
        modifiers: [],
        name: 'medium armor'
      },
      left: { melle: 6, range: 0, armor: 2, modifiers: [], name: 'shield' },
      right: {
        melle: 6,
        range: 0,
        armor: 0,
        modifiers: [],
        name: 'Short Sword'
      }
    },
    power: { armor: 14, melle: 12, range: 0 },
    name: 'Jowy'
  }
  expect(res).toStrictEqual(exp);
});