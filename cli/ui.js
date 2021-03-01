const React = require('react');
const { useState } = require('react');
const { Text, Box } = require('ink');
const importJsx = require('import-jsx')
const TextInput = importJsx('ink-text-input').default

function App() {
	const [name, _] = useState('RPG')
	const [menu, setMenu] = useState()
	const handleSubmit = (val) => {
		
	}

	return (
		<Box flexDirection={'column'} >
			<Box flexDirection={'column'}>
				<Text>
					Hello, <Text color="green">{name}</Text>
				</Text>
				<Text>
					1. New Game.
				</Text>
				<Text>
					2. Load Game.
				</Text>
				<TextInput value={menu} onChange={setMenu} onSubmit={handleSubmit} />
			</Box>
		</Box>
	)
}

module.exports = App;
