import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainComponent from '../src/main/MainComponent';
import LoginComponent from '../src/login/LoginComponent';
import AutoLogin from '../src/login/AutoLogin';

const AppStackNavigator = createSwitchNavigator(
  {
    AutoLogin : AutoLogin,
    Main      : MainComponent,
    Login     : LoginComponent,
  },
  {
    initialRouteName: 'AutoLogin'
  }
);

export default createAppContainer(AppStackNavigator);
