import {createStackNavigator, createAppContainer} from 'react-navigation';

import Feed from './src/components/Feed'
import Login from './src/screens/Login';
import Profile from './src/components/Profile';


import AsyncStorage from '@react-native-community/async-storage';

const hasToken = AsyncStorage.getItem('token');
const nextScreen = hasToken != null ? 'Feed' : 'Login';

const MainNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    Feed: {screen: Feed},
    Profile: {screen: Profile},
  },
  {
    initialRouteName: nextScreen
  }
);

const App = createAppContainer(MainNavigator);

export default App;