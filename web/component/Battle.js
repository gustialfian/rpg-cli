import React, { useState, useEffect } from "react";

import { baseGoal, listGoal } from "../../game/goal";
import { jowy } from "../../game/characters";
import { dummy } from "../../game/enemy";
import { potions } from "../../game/item";
import { generateBattle, calcBattle } from "../../game/battle";
import { addItemToInventory } from "../../game/actor";
import { baseCommand, listAction } from "../../game/action";

const style = {
  btn: 'p-2 mr-1 mb-2 bg-gray-700 hover:bg-gray-600 rounded w-40'
}

const goal = {
  ...baseGoal,
  name: listGoal.debug
}

function useBattle(players, goal) {
  const [battle, setTurn] = useState(generateBattle(players, goal))
  const nextTurn = (command) => {
    setTurn(calcBattle(battle, [command]))
  }

  const [logs, setLogs] = useState([])
  useEffect(_ => {
    setLogs([...battle.logs, ...logs].slice(0, 6))
  }, [battle.logs])

  return {
    battle,
    nextTurn,
    logs,
  }
}

function Battle() {
  const actor = 0
  const { battle, nextTurn, logs } = useBattle([jowy, dummy], goal)
  const [command, setCommand] = useState({ ...baseCommand, actor })
  const [menu, setMenu] = useState('action')

  useEffect(_ => {
    document.addEventListener("keyup", event => {
      // attack
      if (menu == 'action' && event.code == 'KeyA') handleMenuChange('target', 'action', listAction.attack)
      // skill
      if (menu == 'action' && event.code == 'KeyS') handleMenuChange('skill', 'action', listAction.skill)
      // use_item
      if (menu == 'action' && event.code == 'KeyI') handleMenuChange('item', 'action', listAction.use_item)
      // use_item
      if (menu == 'action' && event.code == 'KeyW') handleMenuChange('confirm', 'action', listAction.wait)
    });
  }, [menu])

  const handleMenuChange = (next, cmd, val) => {
    if (next == 'done') {
      nextTurn(command)
      setMenu('action')
      setCommand({ ...baseCommand, actor })
      return
    }
    setMenu(next)
    setCommand({
      ...command,
      [cmd]: val,
    })
  }

  return <div className="p-4 bg-gray-800">
    <h1 className="mb-4 font-semibold text-lg">Goal: {battle.goal.name} | Turn: {battle.turn}</h1>
    <div className="grid grid-flow-row grid-cols-2 grid-rows-2 gap-2">
      <div className="px-2 py-4 border border-white rounded h-52">
        <ul>
          {battle.players.map((v, i) => (
            <li key={i}>{v.name}: {v.hp} | {v.status.length > 0 && v.status.toString()}</li>))}
        </ul>
      </div>
      <div className="px-2 py-4 border border-white rounded h-52">
        Logs:
        <ul>
          {logs.map((v, i) =>
            <li key={i}>{v}</li>)}
        </ul>
      </div>
      <div className="px-2 py-4 border border-white rounded col-span-2 flex flex-wrap h-24">
        <ActionMenu open={menu} turn={battle} actor={actor} onMenuChange={handleMenuChange} />
      </div>
    </div>
  </div>
}

function ActionMenu({ open, turn, onMenuChange, actor }) {
  const handleClick = (next, cmd, val) => onMenuChange(next, cmd, val)

  const handleAction = (v) => {
    if (v == listAction.attack) onMenuChange('target', 'action', v)
    if (v == listAction.skill) onMenuChange('skill', 'action', v)
    if (v == listAction.use_item) onMenuChange('item', 'action', v)
    if (v == listAction.wait) onMenuChange('confirm', 'action', v)
  }

  switch (open) {
    case 'action':
      return Object.values(listAction).map((v, i) => (
        <button key={i} className={style.btn}
          onClick={() => handleAction(v)}>{v}</button>))

    case 'target':
      return turn.players.map((v, i) => (
        <button key={i} className={style.btn}
          onClick={() => handleClick('confirm', 'target', i)}>{v.name}</button>))

    case 'item':
      return turn.players[actor].inventory > 0
        ? turn.players[actor].inventory.map((v, i) => (
          <button key={i} className={style.btn}
            onClick={() => handleClick('target', 'item', i)}>{v.name}</button>))
        : <button className={style.btn} onClick={() => handleClick('action')}>
          Empty
        </button>

    case 'skill':
      return turn.players[actor].skill.map((v, i) => (
        <button key={i} className={style.btn}
          onClick={() => handleClick('target', 'skill', i)}>{v.name}</button>))

    case 'confirm':
      return ['Yes', 'No'].map((v, i) => (
        <button key={i} className={style.btn}
          onClick={() => handleClick('done')}>{v}</button>))

    default:
      return <span>nah!</span>
  }
}



export default Battle