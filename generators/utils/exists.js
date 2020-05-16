const fs = require('fs')
const path = require('path')
const pages = fs.readdirSync(path.join(__dirname, '../../src/pages'))

function projectExists(comp) {
  return pages.map(el => el.split('.')[0]).indexOf(comp) >= 0
}

module.exports = {
  projectExists,
}
