import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('ArabicNotes', () => App);
AppRegistry.runApplication('ArabicNotes', {
  rootTag: document.getElementById('root'),
});
