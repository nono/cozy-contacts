/* global cozy */

import 'styles'

import React from 'react'
import CozyClient from 'cozy-client'
import { render } from 'react-dom'
import MainApp from './main.jsx'

function getDataOrDefault(data, defaultData) {
  return /^\{\{\..*\}\}$/.test(data) ? defaultData : data
}

document.addEventListener('DOMContentLoaded', init)

function init() {
  const root = document.querySelector('[role=application]')
  const { appName, appNamePrefix, iconPath, lang } = getValues(root.dataset)
  const client = initCozyClient(root.dataset.cozyDomain, root.dataset.cozyToken)
  initCozyBar({ appName, appNamePrefix, iconPath, lang })
  render(<MainApp client={client} lang={lang} />, root)
}

/**
 * default data will allow to display correctly the cozy-bar
 * in the standalone (without cozy-stack connexion)
 */
function getValues({
  cozyAppName,
  cozyAppNamePrefix,
  cozyIconPath,
  cozyLocale
}) {
  const defaultValues = {
    appIconDefault: require('../vendor/assets/icon.svg'),
    appNamePrefixDefault: require('../../../manifest.webapp').name_prefix,
    appNameDefault: require('../../../manifest.webapp').name,
    appLocaleDefault: 'en'
  }
  return {
    appName: getDataOrDefault(cozyAppName, defaultValues.appNameDefault),
    appNamePrefix: getDataOrDefault(
      cozyAppNamePrefix,
      defaultValues.appNamePrefixDefault
    ),
    iconPath: getDataOrDefault(cozyIconPath, defaultValues.appIconDefault),
    lang: getDataOrDefault(cozyLocale, defaultValues.appLocaleDefault)
  }
}

function initCozyClient(cozyDomain, cozyToken) {
  const { protocol = 'https' } = window.location
  return new CozyClient({
    uri: `${protocol}//${cozyDomain}`,
    token: cozyToken
  })
}

function initCozyBar({ appName, appNamePrefix, iconPath, lang }) {
  cozy.bar.init({
    appName,
    appNamePrefix,
    iconPath,
    lang,
    replaceTitleOnMobile: true
  })
}
