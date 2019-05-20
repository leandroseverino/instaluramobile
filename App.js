import {createStackNavigator, createAppContainer} from 'react-navigation';

import Feed from './src/components/Feed'
import Login from './src/screens/Login';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Feed: {screen: Feed},
  },
  {
    initialRouteName: 'Login'
  }
);

const App = createAppContainer(MainNavigator);

export default App;