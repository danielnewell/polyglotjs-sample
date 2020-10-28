const Polyglot = require('node-polyglot')
const fs = require('fs')
const polyglots = new Map() // here we will store all our different locales

const translationFiles = fs.readdirSync('./locales').filter(file => file.endsWith('.json')) // gather our locales

for (const file of translationFiles) {
  const t = require('./locales/' + file)
  const p = new Polyglot()
  p.extend(t) // load all translations into it
  const localeName = file.slice(0, -5);
  polyglots.set(localeName, p) // sets the locale name and the Polyglot instance
}

function translate (key, locale, options = {}) {
    return polyglots.get(locale).t(key, options)
}

console.log(translate('hello', 'de', { name: 'Daniel' }))