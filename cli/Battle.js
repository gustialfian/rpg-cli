const React = require('react');
const { useState } = require('react');
const { Text, Box, Newline } = require('ink');

const { initBattle } = require('../game/sample-state')

const importJsx = require('import-jsx')
const TextInput = importJsx('ink-text-input').default

/**
  {
    action: 'attack',
    actor: getPlayerIndexByName(initBattle, 'Jowy'),
    target: getPlayerIndexByName(initBattle, 'slime'),
  }
 */

function Battle(params) {
  const [mode, setMode] = useState('action')
  const [input, setInput] = useState('')
  // const [pick, setPick] = useState(-1)
  const [command, setCommand] = useState({
    action: '',
    actor: -1,
    target: -1,
  })
  console.log(`hai`, command)

  const handleSubmit = (val) => {
    if (mode == 'action' && val == 'a') {
      setMode('attack')
      setCommand({...command, action: 'attack'})
      setInput('')
    }
    if (mode == 'attack') {
      setMode('action')
      setCommand({...command, actor: 0, target: val})
      setInput('')
    }
  }

  return (
    <Box flexDirection="column">
      <Box width={20}>
        <Text>Battle Screen</Text>
      </Box>
      <Box minHeight={10}>
        <Box borderStyle={"round"} width={50}>
          <Profile player={initBattle.players[0]} />
        </Box>

        <Box borderStyle={"round"} width={30}>
          <Text>
            <Text>Players: </Text> <Newline />
            <ListPlayer players={initBattle.players} />
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
  return <Text>
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
    return <Text>pick target (index)</Text>
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

module.exports = Battle