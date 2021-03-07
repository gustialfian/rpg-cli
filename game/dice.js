
function dice(n, d) {
  return n * getRandomInt(d)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

module.exports = {
  dice,
}