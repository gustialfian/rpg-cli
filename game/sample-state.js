module.exports = {
  initBattle: {
    turn: 0,
    players: [
      {
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
      },
      {
        hp: 5,
        ac: 5,
        dc: 5,
        str: 5,
        con: 5,
        dex: 5,
        int: 5,
        wis: 5,
        cha: 5,
        equipment: [Object],
        power: [Object],
        name: 'slime'
      },
      {
        hp: 5,
        ac: 5,
        dc: 5,
        str: 5,
        con: 5,
        dex: 5,
        int: 5,
        wis: 5,
        cha: 5,
        equipment: [Object],
        power: [Object],
        name: 'dummy'
      }
    ],
    commands: [],
    logs: [],
    goal: { name: 'kill', target: 'slime' },
    status: {}
  },
}