import React from 'react'
import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/react/I18n'
import App from 'components/App'
import { hot } from 'react-hot-loader'

const RootApp = props => (
  <I18n lang={props.lang} dictRequire={lang => require(`locales/${lang}`)}>
    <CozyProvider client={props.client}>
      <App />
    </CozyProvider>
  </I18n>
)

export default hot(module)(RootApp)
