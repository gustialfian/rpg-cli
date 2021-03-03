const initBattle = {
  "turn": 0,
  "players": [
    {
      "hp": 10,
      "ac": 0,
      "dc": 0,
      "str": 10,
      "con": 10,
      "dex": 10,
      "int": 10,
      "wis": 10,
      "cha": 10,
      "equipment": {
        "armor": {
          "melle": 0,
          "range": 0,
          "armor": 12,
          "modifiers": [],
          "name": "medium armor"
        },
        "left": {
          "melle": 6,
          "range": 0,
          "armor": 2,
          "modifiers": [],
          "name": "shield"
        },
        "right": {
          "melle": 6,
          "range": 0,
          "armor": 0,
          "modifiers": [],
          "name": "Short Sword"
        }
      },
      "power": {
        "armor": 14,
        "melle": 12,
        "range": 0
      },
      "name": "Jowy"
    },
    {
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
          "name": "Slamer"
        }
      },
      "power": {
        "armor": 2,
        "melle": 2,
        "range": 0
      },
      "name": "slime"
    },
    {
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
  ],
  "commands": [],
  "logs": [],
  "goal": {
    "name": "kill",
    "target": "slime"
  },
  "status": {}
}

const turn1 = {
  "turn": 1,
  "players": [
    {
      "hp": 8,
      "ac": 0,
      "dc": 0,
      "str": 10,
      "con": 10,
      "dex": 10,
      "int": 10,
      "wis": 10,
      "cha": 10,
      "equipment": {
        "armor": {
          "melle": 0,
          "range": 0,
          "armor": 12,
          "modifiers": [],
          "name": "medium armor"
        },
        "left": {
          "melle": 6,
          "range": 0,
          "armor": 2,
          "modifiers": [],
          "name": "shield"
        },
        "right": {
          "melle": 6,
          "range": 0,
          "armor": 0,
          "modifiers": [],
          "name": "Short Sword"
        }
      },
      "power": {
        "armor": 14,
        "melle": 12,
        "range": 0
      },
      "name": "Jowy"
    },
    {
      "hp": 0,
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
          "name": "Slamer"
        }
      },
      "power": {
        "armor": 2,
        "melle": 2,
        "range": 0
      },
      "name": "slime"
    },
    {
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
  ],
  "commands": [
    {
      "action": "attack",
      "actor": 0,
      "target": 1
    },
    {
      "action": "attack",
      "actor": 1,
      "target": 0
    },
    {
      "action": "attack",
      "actor": 2,
      "target": 2
    }
  ],
  "logs": [
    "Jowy attack slime for 12",
    "slime attack Jowy for 2",
    "dummy attack dummy for 0",
    "Win"
  ],
  "goal": {
    "name": "kill",
    "target": "slime",
    "isDone": true
  },
  "status": {
    "slime": "dead"
  }
}

module.exports = {
  initBattle,
  turn1,
}