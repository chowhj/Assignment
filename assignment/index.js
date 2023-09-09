/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
    AppRegistry.runApplication('assignment', { rootTag });
    const rootTag = document.getElementById('root') || document.getElementById('assignment');
}
