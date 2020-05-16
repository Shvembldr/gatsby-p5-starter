const { pageExists } = require('../utils/exists')

module.exports = {
  description: 'Add a page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'gallery',
      validate: value => {
        if (/.+/.test(value)) {
          return pageExists(value)
            ? 'A page with this name already exists'
            : true
        }

        return 'The name is required'
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select SEO type',
      default: 'Default',
      choices: () => ['Default', 'Custom'],
    },
  ],
  actions: data => {
    const actions = []

    if (data.type === 'Default') {
      actions.push({
        type: 'add',
        path: '../src/pages/{{name}}.js',
        templateFile: './page/index.js.hbs',
        abortOnFail: true,
      })
    } else {
      actions.push({
        type: 'add',
        path: '../src/pages/{{name}}.js',
        templateFile: './page/indexCustomSeo.js.hbs',
        abortOnFail: true,
      })
    }

    actions.push({
      type: 'add',
      path: '../src/components/{{properCase name}}/index.js',
      templateFile: './component/component.js.hbs',
      abortOnFail: true,
    })
    actions.push({
      type: 'add',
      path: '../src/components/{{properCase name}}/styled.js',
      templateFile: './component/styled.js.hbs',
      abortOnFail: true,
    })

    return actions
  },
}
