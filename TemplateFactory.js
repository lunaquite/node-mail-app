import Mailgen from 'mailgen'
import * as templates from './templates'
import _ from 'lodash'

export default class {
  constructor ($config, theme = 'default') {
    const mailGenerator = new Mailgen({
      theme: theme,
      product: {
        name: $config.APP_NAME,
        link: $config.APP_ADRESS
      }
    })
    for (const temp in templates) {
      const tempCurry = _.curry(templates[temp])($config.APP_ADRESS)
      this[temp] = (params) => ({ content: mailGenerator.generate(tempCurry(params)), subject: tempCurry({}).subject })
    }
  }
  }
