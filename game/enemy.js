
const moster = {
  hp: 0,
  maxHp: 0,
  atk: 0,
  skill: [],
  status: [],
  name: 'base moster',
}

const slime = {
  ...moster,
  hp: 5,
  maxHp: 5,
  skill: [],
  atk: 2,
  name: "slime",
}
const dummy = {
  ...moster,
  hp: 100,
  maxHp: 100,
  skill: [],
  atk: 0,
  name: "dummy"
}
module.exports = {
  slime,
  dummy,
}