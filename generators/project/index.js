const { projectExists } = require('../utils/exists')

module.exports = {
  description: 'Add a project',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'NewSketch',
      validate: value => {
        if (/.+/.test(value)) {
          return projectExists(value)
            ? 'A project with this name already exists'
            : true
        }

        return 'The name is required'
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select sketch type',
      default: 'Static',
      choices: () => ['Static', 'Motion'],
    },
  ],
  actions: data => [
    {
      type: 'add',
      path: '../src/projects/{{properCase name}}/index.js',
      templateFile:
        data.type === 'Static'
          ? './project/projectStatic.js.hbs'
          : './project/projectMotion.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../src/projects/{{properCase name}}/settings.js',
      templateFile: './project/settings.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../src/pages/{{lowerCase name}}.js',
      templateFile: './page/page.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'modify',
      path: '../src/pages/index.js',
      pattern: `{/* PLOP_INJECT_LINK */}`,
      templateFile: './page/index.js.hbs',
      abortOnFail: true,
    },
  ],
}
