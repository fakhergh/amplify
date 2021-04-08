import { AppRegistry, LogBox } from 'react-native';
import Amplify from 'aws-amplify';

import App from './App';
import { name as appName } from './app.json';
import amplifyConfig from './src/aws-exports';

Amplify.configure(amplifyConfig);

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
