import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Main from './src/Main';
import BarcodeScanner from './src/Barcode_Scan';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
const App = ()=> {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
    <BarcodeScanner />
  );
}

export default App;