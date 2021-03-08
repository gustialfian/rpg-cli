import React from "react";

import { jowy } from "../../game/characters";

const style = {
  btn: 'p-1 mb-2 hover:bg-gray-700 border border-white rounded w-52 capitalize'
}

function Player() {
  const p = jowy
  console.log(jowy)

  const handleDetail = (m, i) => {
    if (!Array.isArray(jowy[m])) {
      console.log(Object.values(jowy[m])[i].name)
      return
    }
    console.log(jowy[m][i].name)
  }

  return <div className="p-4 bg-gray-800">
    <h1 className="mb-4 font-semibold text-xl">{p.name}</h1>
    <div className="grid grid-flow-row grid-cols-2 grid-rows-2 grid-flow-row-dense gap-4">
      <div className="">
        <ul>
          <li>HP : {`${p.hp}/${p.maxHp}`}</li>
          <li>MP : {`${p.mp}/${p.maxMp}`}</li>
          <li>ATK: {p.atk}</li>
          <li>DEF: {p.def}</li>
          <li>Skillslot : {p.skillSlot}</li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">Equipment</h2>
        <ListMenu
          menu={"equipment"}
          data={Object.values(p.equipment)}
          onDetail={handleDetail} />
      </div>
      <div className="">
        <h2 className="font-bold mb-2">Inventory</h2>
        <ListMenu
          menu={"inventory"}
          data={p.inventory}
          onDetail={handleDetail} />
      </div>
      <div>
        <h2 className="font-bold mb-2">Skill</h2>
        <ListMenu
          menu={"skill"}
          data={p.skill}
          onDetail={handleDetail} />
      </div>
    </div>
  </div>
}

function ListMenu({ menu, data, onDetail }) {
  const handleClick = (i) => onDetail(menu, i)

  if (data.length <= 0) {
    return <span>Empty</span>
  }

  return data.map((v, i) => (
    <button
      key={i}
      className={style.btn}
      onClick={() => handleClick(i)}>
      {v.name}
    </button>
  ))
}

export default Player