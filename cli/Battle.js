const React = require('react');
const { useState } = require('react');
const { Text, Box, Newline } = require('ink');

const { initBattle } = require('../game/sample-state')
const { calcBattle, getPlayerIndexByName } = require('../game/battle')

const importJsx = require('import-jsx')
const TextInput = importJsx('ink-text-input').default

/**
 * extrack logic to custom hooks 
 */

function Battle(params) {
  const [battle, setBattle] = useState(initBattle)

  const [profile, setProfile] = useState(0)
  const [mode, setMode] = useState('action')
  const [input, setInput] = useState('')


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

  const handleSubmit = (input) => {
    setMode(getActionFromMode(mode, input))

    if (mode != 'action') {
      const { nextBattle, nextNode, nextProfile } = sendCommand({
        battle, mode, input,
        commands: [slimeCommand, dummyCommand]
      })
      setMode(nextNode)
      setBattle(nextBattle)
      setProfile(nextProfile)
    }

    setInput('')
  }

  if (isNaN(profile)) {
    setProfile(0)
  }

  return (
    <Box flexDirection="column">
      <Box width={20}>
        <Text>Battle Screen</Text>
      </Box>
      <Box minHeight={10}>
        <Box borderStyle={"round"} width={50}>
          <Profile player={battle.players[profile]} />
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
          {battle.goal.isDone ? <Menu mode={'wining'} /> : <Menu mode={mode} />}
          <Newline />

          {mode == 'goal' && <Text>{battle.goal.name} {battle.goal.target} [ENTER]</Text>}
          {mode == 'logs' && <Logs data={battle.logs} />}
          <Newline />

          {!battle.goal.isDone &&
            <Text>
              $ <TextInput value={input} onChange={setInput} onSubmit={handleSubmit} />
            </Text>}

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

function Logs({ data }) {
  return data.map((v, i) => (
    <Text key={i}>
      <Text>{v}</Text>
      <Newline />
    </Text>
  ))
}

function Menu({ mode }) {
  if (mode == 'action') {
    return <Text>(a)ttack, (w)ait, (g)oal, (p)rofile, (l)ogs</Text>
  }
  if (mode == 'attack') {
    return <Text>Attacking pick target (index)</Text>
  }
  if (mode == 'profile') {
    return <Text>Pick character (index)</Text>
  }
  if (mode == 'wait') {
    return <Text>waiting...</Text>
  }
  if (mode == 'wining') {
    return <Text>Wining...</Text>
  }
  if (mode == 'losing') {
    return <Text>Losing...</Text>
  }
  if (mode == 'goal') {
    return <Text>Goal: </Text>
  }
  if (mode == 'logs') {
    return <Text>Logs: </Text>
  }
  return <Text>Unknown</Text>
}

function getActionFromMode(mode, input) {
  if (mode == 'action' && input == 'a') {
    return 'attack'
  }
  if (mode == 'action' && input == 'w') {
    return 'wait'
  }
  if (mode == 'action' && input == 'g') {
    return 'goal'
  }
  if (mode == 'action' && input == 'p') {
    return 'profile'
  }
  if (mode == 'action' && input == 'l') {
    return 'logs'
  }
  return mode
}

function sendCommand({ battle, mode, input, commands }) {
  if (mode == 'attack') {
    const command = { action: 'attack', actor: 0, target: parseInt(input) }
    const nextBattle = calcBattle(battle, [command, ...commands])
    return { nextNode: 'action', nextBattle }
  }
  if (mode == 'wait') {
    const command = { action: 'wait', actor: 0, target: 0 }
    const nextBattle = calcBattle(battle, [command, ...commands])
    return { nextNode: 'action', nextBattle }
  }

  if (mode == 'goal' || mode == 'logs') {
    return { nextNode: 'action', nextBattle: battle }
  }
  if (mode == 'profile') {
    return { nextNode: 'action', nextBattle: battle, nextProfile: input }
  }

  return { nextNode: mode, nextBattle: battle }
}

module.exports = Battle