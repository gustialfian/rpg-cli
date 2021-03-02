const React = require('react');
const importJsx = require('import-jsx')

const TextInput = importJsx('ink-text-input').default
const Battle = importJsx('./Battle')

function App() {
	return <Battle />
}

module.exports = App;
