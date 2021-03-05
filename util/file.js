const fs = require('fs');

function save(json) {
  const filename = 'output.json'
  return new Promise((resolve, rejects) => {
    fs.writeFile(filename, JSON.stringify(json, null, '\t'), 'utf8', function (err) {
      if (err) rejects(err)
      resolve(filename)
    });
  })
}

module.exports = {
  save,
}