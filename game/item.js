const item = {
  melle: 0,
  range: 0,
  armor: 0,
  modifiers: [],
}

const armor = [
  {
    ...item,
    armor: 11,
    name: 'light armor',
  },
  {
    ...item,
    armor: 12,
    name: 'medium armor',
  },
  {
    ...item,
    armor: 14,
    name: 'heavy armor',
  },
]

const weapon = [
  {
    ...item,
    melle: 4,
    name: 'Dagger',
  },
  {
    ...item,
    melle: 6,
    name: 'Short Sword',
  },
  {
    ...item,
    range: 8,
    name: 'Longbow',
  },
  {
    ...item,
    melle: 6,
    armor: 2,
    name: 'shield',
  },
]