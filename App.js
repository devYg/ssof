import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import LoginComponent from './src/login/LoginComponent';
import ViewController from './src/ViewController';

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isReady: false,
  //   };
  // }

  // async componentDidMount() {
  //   // // 폰드 로딩
  //   await Font.loadAsync({
  //     Roboto: require('native-base/Fonts/Roboto.ttf'),
  //     Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  //     ...Ionicons.font,
  //   });

  //   this.setState({ isReady: true });
  // }

  render() {
    // if (!this.state.isReady) {
    //   return <AppLoading />;
    // }

    return (
      <ViewController />
      
    );
  }
}