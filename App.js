// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import BarcodeScanner from './src/Barcode_Scan';
// import LoginComponent from './src/login/LoginComponent';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
 
// const App = ()=> {
//   return (
//     // <View style={styles.container}>
//     //   <Text>Open up App.js to start working on your app!</Text>
//     // </View>
//     <LoginComponent />
//   );
// }

// export default App;

import React from 'react';
import { AppLoading } from 'expo';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import BarcodeScanner from './src/Barcode_Scan';
import Index from './src/Index';
import LoginComponent from './src/login/LoginComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Root>
        <LoginComponent />
      </Root>
    );
  }
}