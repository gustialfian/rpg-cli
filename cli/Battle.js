const React = require('react');
const { useState } = require('react');
const { Text, Box, Newline } = require('ink');

const { initBattle } = require('../game/sample-state')
const { calcBattle, getPlayerIndexByName } = require('../game/battle')

const importJsx = require('import-jsx')
const TextInput = importJsx('ink-text-input').default

const baseCommand = {
  action: '',
  actor: -1,
  target: -1,
}

function Battle(params) {
  const [battle, setBattle] = useState(initBattle)

  const [mode, setMode] = useState('action')
  const [input, setInput] = useState('')
  const [command, setCommand] = useState(baseCommand)


  const slimeCommand = {
    action: 'attack',
    actor: getPlayerIndexByName(initBattle, 'slime'),
    target: getPlayerIndexByName(initBattle, 'Jowy'),
  }
  const dummyCommand = {
    action: 'attack',
    actor: getPlayerIndexByName(initBattle, 'dummy'),
    target: getPlayerIndexByName(initBattle, 'dummy'),
  }
  console.log(`hai`, [command, slimeCommand, dummyCommand])

  const handleSubmit = (val) => {
    if (mode == 'action' && val == 'a') {
      setMode('attack')
      setCommand({ ...command, action: 'attack' })
    }
    if (mode == 'action' && val == 'w') {
      setMode('wait')
      setCommand({ ...command, action: 'wait' })
    }
    if (mode == 'attack') {
      setMode('action')
      setCommand({ ...command, actor: 0, target: val })
      setBattle(calcBattle(battle, [command, slimeCommand, dummyCommand]))
    }
    if (mode == 'wait') {
      setMode('action')
      setCommand({ ...command, actor: 0, target: 0 })
      setBattle(calcBattle(battle, [command, slimeCommand, dummyCommand]))
    }
    setInput('')
  }

  return (
    <Box flexDirection="column">
      <Box width={20}>
        <Text>Battle Screen</Text>
      </Box>
      <Box minHeight={10}>
        <Box borderStyle={"round"} width={50}>
          <Profile player={battle.players[0]} />
        </Box>

        <Box borderStyle={"round"} width={30}>
          <Text>
            <Text>Players: </Text> <Newline />
            <ListPlayer players={battle.players} />
          </Text>
        </Box>
      </Box>

      <Box borderStyle={"round"} width={80}>
        <Text>
          {/* <Logs logs={initBattle.logs} /> */}
          <Menu mode={mode} /><Newline />
          <Text>$ </Text>
          <TextInput value={input} onChange={setInput} onSubmit={handleSubmit} />
        </Text>
      </Box>
    </Box>
  )
}

function Profile({ player }) {
  return (
    <Text>
      <Text>{player.name}</Text> <Newline />
      <Text>HP: {player.hp}</Text> <Newline />
      <Newline />
      <Text>Equipment</Text> <Newline />
      <Text>Right: {player.equipment.right.name}</Text> <Newline />
      <Text>Left:  {player.equipment.left.name}</Text> <Newline />
      <Text>Armor: {player.equipment.armor.name}</Text> <Newline />
      <Newline />
      <Text>Power</Text> <Newline />
      <Text>Melle:  {player.power.melle}</Text> <Newline />
      <Text>Armor: {player.power.armor}</Text> <Newline />
    </Text>
  )
}

function ListPlayer({ players }) {
  return players.map((v, i) => (
    <Text key={i}>
      <Text>{i}. {v.name}: {v.hp}</Text>
      <Newline />
    </Text>
  ))
}

function Menu({ mode }) {
  if (mode == 'action') {
    return <Text>(a)ttack, (w)ait</Text>
  }

  if (mode == 'attack') {
    return <Text>Attacking pick target (index)</Text>
  }

  if (mode == 'wait') {
    return <Text>waiting...</Text>
  }

  return <Text>Unknown</Text>
}

function Logs({ logs }) {
  return logs.map((v, i) => (
    <Text key={i}>
      <Text>{v}</Text>
      <Newline />
    </Text>
  ))
}

function sendCommand(commands) {
  console.log(`sendCommand...`)
}

module.exports = Battle