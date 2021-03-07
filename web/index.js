import React from "react";
import ReactDOM from "react-dom";

import { weapon, armor, potions } from "../game/item";
import { skill } from "../game/skill";

import {
  initActor,
  setMaxStat,
  setEquipment,
  addSkill,
  addItemToInventory
} from "../game/actor";

function App() {
  let res = initActor('riou')
  res = setMaxStat(res, { maxHp: 30, maxMp: 30 })
  res = setEquipment(res, { weapon: weapon[4], armor: armor[0] })
  res = addSkill(res, skill[0])
  res = addItemToInventory(res, potions[0])
  console.log(res)
  return (
    <>
      <h1>Hello RPG</h1>
      <pre>{JSON.stringify(res, null, '\t')}</pre>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))