const projectGenerator = require('./project/index.js')

module.exports = plop => {
  plop.setGenerator('project', projectGenerator)
}
