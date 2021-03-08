import React from "react";
import ReactDOM from "react-dom";

import Battle from "./component/Battle";
import Player from "./component/Player";

function App() {
  return (
    <div className="flex flex-col h-screen p-4">
      <header className="mb-4 p-4 border-2 border-white rounded">
        <h1 className="font-bold text-2xl text-bold">Simple RPG</h1>
      </header>
      {/* <Player /> */}
      <Battle />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))