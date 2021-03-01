const React = require('react');
const { useState } = require('react');
const { Text, Box } = require('ink');
const importJsx = require('import-jsx')
const TextInput = importJsx('ink-text-input').default

function CharacterCreation() {
  const [touch, setTouch] = useState({
    
  })
  const [char, setChar] = useState({
    name: '',
  })

  const setName = (val) => {
    setChar({ ...char, name: val })
  }

  const handleSubmit = () => {
    setChar({ ...char, name: '' })
  }

  return (
    <Box flexDirection={'column'}>
      <Box>
        <Text>
          Name:
        <TextInput value={char.name} onChange={setName} onSubmit={handleSubmit} />
        </Text>
      </Box>
      <Box>
        <Text>
          {JSON.stringify(char, null, '')}
        </Text>
      </Box>
    </Box>
  )
}

module.exports = CharacterCreation;
