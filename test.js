
import TemplateFactory from './templateFactory'
import Transporter from './Transporter'
import chai from 'chai'
import _ from 'lodash'
const expect = chai.expect

let templateFactory, transporter

const config = {
  APP_NAME: 'Achievements MISIS',
  APP_ADRESS: 'http://example.com',
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 465,
  SMTP_USER: 'youremail',
  SMTP_PASSWORD: 'yourpassword',
  SMTP_SECURE: true
}

before(() => {
  templateFactory = new TemplateFactory(config)
  transporter = new Transporter(config, templateFactory)
})

describe('Mail template factory', () => {
  it('has required interface', () => {
    expect(templateFactory.userConfirmation).to.be.a('function')
    expect(templateFactory.recoveryPassword).to.be.a('function')
    expect(templateFactory.adminRegistration).to.be.a('function')
  })
  it('generate a confirmation template', () => {
    const params = { name: 'jambul', token: 'asdadkasd' }
    const regExps = _.map(params, (str) => new RegExp(str))
    const template = templateFactory.userConfirmation(params).content
    expect(template).to.be.a('string')
    regExps.forEach(reg => {
      expect(reg.test(template), reg.source).to.equal(true)
    })
  })
  it('generate a password recovery template', () => {
    const params = { name: 'jambul', token: 'asdadkasd' }
    const regExps = _.map(params, (str) => new RegExp(str))
    const { content, subject } = templateFactory.recoveryPassword(params)
    expect(subject).to.be.a('string')
    expect(content).to.be.a('string')
    regExps.forEach(reg => {
      expect(reg.test(content), reg.source).to.equal(true)
    })
  })
  it('generate a admin registration template', () => {
    const params = { token: 'asdadkasd' }
    const template = templateFactory.adminRegistration(params).content
    const regExps = _.map(params, (str) => new RegExp(str))
    expect(template).to.be.a('string')
    regExps.forEach(reg => {
      expect(reg.test(template), reg.source).to.equal(true)
    })
  })
})

describe('transporter', () => {
  it('sends confirmation email', (done) => {
    transporter.sendTemplate('lod.ilya.zubkov@gmail.com', 'userConfirmation', {name: 'Илья', token: 'asdasjjjs'})
      .then(info => {
        expect(info.accepted.length).to.equal(1)
        done()
      })
      .catch(e => {
        done(e)
      })
  })
})
