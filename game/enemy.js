const slime = {
  "hp": 5,
  "ac": 5,
  "dc": 5,
  "str": 5,
  "con": 5,
  "dex": 5,
  "int": 5,
  "wis": 5,
  "cha": 5,
  "equipment": {
    "armor": {
      "melle": 0,
      "range": 0,
      "armor": 2,
      "modifiers": [],
      "name": "slime"
    },
    "left": {
      "melle": 0,
      "range": 0,
      "armor": 0,
      "modifiers": []
    },
    "right": {
      "melle": 2,
      "range": 0,
      "armor": 0,
      "modifiers": [],
      "name": "slamer"
    }
  },
  "power": {
    "armor": 2,
    "melle": 2,
    "range": 0
  },
  "name": "slime"
}
const dummy = {
  "hp": 5,
  "ac": 5,
  "dc": 5,
  "str": 5,
  "con": 5,
  "dex": 5,
  "int": 5,
  "wis": 5,
  "cha": 5,
  "equipment": {
    "armor": {
      "melle": 0,
      "range": 0,
      "armor": 0,
      "modifiers": []
    },
    "left": {
      "melle": 0,
      "range": 0,
      "armor": 0,
      "modifiers": []
    },
    "right": {
      "melle": 0,
      "range": 0,
      "armor": 0,
      "modifiers": []
    }
  },
  "power": {
    "armor": 0,
    "melle": 0,
    "range": 0
  },
  "name": "dummy"
}
module.exports = {
  slime,
  dummy,
}