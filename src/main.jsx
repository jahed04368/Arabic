import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

// Cache the app shell so it opens with no connection at all. Any new version
// you push replaces it the next time the site is opened online.
registerSW({ immediate: true });

AppRegistry.registerComponent('ArabicNotes', () => App);
AppRegistry.runApplication('ArabicNotes', {
  rootTag: document.getElementById('root'),
});
